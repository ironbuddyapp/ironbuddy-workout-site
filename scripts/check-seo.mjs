// SEO regression check for the static export. Run after a build:
//
//   npm run build && npm run seo:check
//
// Checks every page in out/ for: title and description length, self-referencing canonical, complete Open Graph and
// Twitter tags, exactly one H1 and no skipped heading levels, duplicate ids, image alt text and dimensions, valid
// JSON-LD (no dangling references, breadcrumbs, FAQ markup that matches visible text and appears on one page only),
// broken internal links and anchors, and that sitemap.xml, robots.txt, llms.txt and the manifest agree with the pages.
// No dependencies. Exits with code 1 if anything is wrong, so it can gate a CI job.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] ?? "out");
const siteSource = fs.readFileSync(path.resolve("src/lib/site.ts"), "utf8");
const ORIGIN = siteSource.match(/\burl:\s*"(https?:\/\/[^"]+)"/)[1];
const OG_IMAGE = siteSource.match(/\bogImage:\s*"([^"]+)"/)[1];
const problems = [];
const warn = (page, msg) => problems.push(`[${page}] ${msg}`);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textOf = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? decode(m[1]) : null; };

// ---- collect pages
const pageFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "_next") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pageFiles.push(p);
  }
})(out);

const pages = pageFiles.map((file) => {
  const rel = path.relative(out, path.dirname(file)).replace(/\\/g, "/");
  const urlPath = rel === "" ? "/" : `/${rel}/`;
  const html = fs.readFileSync(file, "utf8");
  return { file, urlPath, html, is404: urlPath === "/404/" };
});
const indexable = pages.filter((p) => !p.is404);
const known = new Set(pages.map((p) => p.urlPath));

const titles = new Map();
const descs = new Map();
const faqQuestions = new Map();
const idsByPage = new Map();

for (const p of indexable) {
  const { html, urlPath } = p;
  const label = urlPath;
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]);
  const metaContent = (key, by = "name") => { const m = metas.find((t) => attr(t, by) === key); return m ? attr(m, "content") : null; };
  const desc = metaContent("description");
  const canonical = links.filter((l) => attr(l, "rel") === "canonical").map((l) => attr(l, "href"));

  // titles / descriptions
  if (title.length < 50 || title.length > 60) warn(label, `title length ${title.length}: "${title}"`);
  if (!desc || desc.length < 140 || desc.length > 160) warn(label, `description length ${desc?.length}`);
  if (titles.has(title)) warn(label, `duplicate title with ${titles.get(title)}`);
  if (descs.has(desc)) warn(label, `duplicate description with ${descs.get(desc)}`);
  titles.set(title, label); descs.set(desc, label);

  // canonical / OG / twitter
  const expectedCanonical = ORIGIN + urlPath;
  if (canonical.length !== 1 || canonical[0] !== expectedCanonical) warn(label, `canonical is ${JSON.stringify(canonical)}, expected ${expectedCanonical}`);
  if (metaContent("og:url", "property") !== expectedCanonical) warn(label, `og:url = ${metaContent("og:url", "property")}`);
  if (metaContent("og:image", "property") !== `${ORIGIN}${OG_IMAGE}`) warn(label, "og:image missing/incorrect");
  for (const k of ["og:title", "og:description", "og:site_name", "og:locale", "og:type", "og:image:width", "og:image:height"]) if (!metaContent(k, "property")) warn(label, `missing ${k}`);
  for (const k of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!metaContent(k)) warn(label, `missing ${k}`);
  if (metaContent("twitter:title") !== metaContent("og:title", "property")) warn(label, "twitter:title != og:title");
  const robots = metas.filter((t) => attr(t, "name") === "robots").map((t) => attr(t, "content"));
  if (robots.some((r) => /noindex/i.test(r))) warn(label, `noindex present: ${robots}`);
  if (links.some((l) => attr(l, "rel") === "alternate" && attr(l, "hreflang"))) warn(label, "unexpected hreflang alternate");

  // headings
  const heads = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: +m[1], text: textOf(m[2]) }));
  const h1s = heads.filter((h) => h.level === 1);
  if (h1s.length !== 1) warn(label, `H1 count = ${h1s.length}`);
  let prev = 0;
  for (const h of heads) { if (prev && h.level > prev + 1) warn(label, `heading skip h${prev}->h${h.level} "${h.text.slice(0, 40)}"`); prev = h.level; }
  if (heads[0] && heads[0].level !== 1) warn(label, "first heading is not H1");

  // ids: duplicates
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) warn(label, `duplicate DOM ids: ${[...new Set(dup)].join(", ")}`);
  idsByPage.set(urlPath, new Set(ids));

  // images
  for (const img of [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])) {
    if (attr(img, "alt") === null) warn(label, `img without alt: ${attr(img, "src")}`);
    if (!attr(img, "width") || !attr(img, "height")) warn(label, `img without dimensions: ${attr(img, "src")}`);
    const src = attr(img, "src");
    if (src && src.startsWith("/") && !fs.existsSync(path.join(out, src.split("?")[0]))) warn(label, `img file missing: ${src}`);
  }

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (blocks.length !== 1) warn(label, `expected 1 JSON-LD block, found ${blocks.length}`);
  for (const raw of blocks) {
    let data;
    try { data = JSON.parse(raw); } catch (e) { warn(label, `JSON-LD parse error: ${e.message}`); continue; }
    if (data["@context"] !== "https://schema.org") warn(label, "JSON-LD @context wrong");
    const nodes = data["@graph"] ?? [];
    const idSet = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
    if (idSet.size !== nodes.filter((n) => n["@id"]).length) warn(label, "duplicate @id in graph");
    const types = nodes.map((n) => [].concat(n["@type"]).join("+"));
    // dangling references: allowed only for the three site-wide entities
    const allowed = new Set([`${ORIGIN}/#organization`, `${ORIGIN}/#website`, `${ORIGIN}/#app`, `${ORIGIN}/#logo`]);
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === "object") {
        const keys = Object.keys(v);
        if (keys.length === 1 && keys[0] === "@id" && !idSet.has(v["@id"]) && !allowed.has(v["@id"])) warn(label, `dangling @id ${v["@id"]}`);
        Object.values(v).forEach(walk);
      }
    };
    walk(nodes);
    const need = (cond, msg) => { if (!cond) warn(label, `JSON-LD: ${msg}`); };
    for (const video of nodes.filter((n) => n["@type"] === "VideoObject")) {
      // Google Search Console: "uploadDate is missing a time zone" / "Invalid datetime value".
      need(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(video.uploadDate ?? "") && !Number.isNaN(Date.parse(video.uploadDate)), `VideoObject uploadDate must be a full ISO 8601 datetime with a time zone, got "${video.uploadDate}"`);
      need(/^PT(\d+H)?(\d+M)?(\d+S)?$/.test(video.duration ?? ""), "VideoObject duration must be ISO 8601 (PT#M#S)");
    }
    const org = nodes.find((n) => n["@type"] === "Organization");
    need(org && org.logo?.width >= 112 && org.logo?.height >= 112, "Organization logo must be >= 112px");
    need(org && org.contactPoint?.[0]?.email, "Organization contactPoint email");
    const page = nodes.find((n) => n["@id"] === `${ORIGIN}${urlPath}#webpage`);
    need(page, "page node missing");
    if (page) {
      need(page.url === ORIGIN + urlPath, "page.url");
      need(/^\d{4}-\d{2}-\d{2}$/.test(page.datePublished) && /^\d{4}-\d{2}-\d{2}$/.test(page.dateModified), "dates ISO");
      need(page.dateModified >= page.datePublished, "dateModified >= datePublished");
    }
    if (urlPath !== "/") {
      const bc = nodes.find((n) => n["@type"] === "BreadcrumbList");
      need(bc, "BreadcrumbList missing");
      if (bc) {
        need(bc.itemListElement.every((it, i) => it.position === i + 1 && it.name && it.item), "breadcrumb positions/items");
        need(bc.itemListElement.at(-1).item === ORIGIN + urlPath, "breadcrumb last item is the page");
        need(bc.itemListElement[0].item === `${ORIGIN}/`, "breadcrumb starts at home");
      }
    }
    const app = nodes.find((n) => [].concat(n["@type"]).includes("MobileApplication"));
    if (urlPath === "/") {
      need(app && [].concat(app["@type"]).includes("SoftwareApplication"), "MobileApplication+SoftwareApplication");
      need(app?.operatingSystem === "Android" && app?.applicationCategory === "HealthApplication", "app OS/category");
      need(app?.offers?.description, "offers.description");
      need(app?.offers && String(app.offers.price ?? "") !== "0", "offers.price must not be 0: the app requires a purchase after the free trial");
      if (app?.offers?.price) {
        need(app.offers.priceCurrency, "offers.priceCurrency is required alongside price");
        need(textOf(html).includes(app.offers.price), `offers.price ${app.offers.price} must be visible in the page text (markup has to match what visitors see)`);
      }
      need(app?.screenshot?.length >= 3, "at least 3 screenshots");
      for (const shot of app?.screenshot ?? []) {
        const file = path.join(out, new URL(shot.contentUrl).pathname);
        need(fs.existsSync(file), `screenshot file exists: ${shot.contentUrl}`);
        need(shot.width > 0 && shot.height > 0, `screenshot has width and height: ${shot.contentUrl}`);
      }
    }
    const article = nodes.find((n) => n["@type"] === "Article");
    if (article) {
      need(article.headline.length <= 110, "headline <= 110");
      need(article.author && article.publisher && article.image?.length && article.datePublished, "Article author/publisher/image/date");
    }
    // FAQ markup must match visible text and be unique across the site
    const faqNodes = nodes.filter((n) => [].concat(n["@type"]).includes("FAQPage"));
    const visible = textOf(html);
    for (const f of faqNodes) {
      for (const q of f.mainEntity ?? []) {
        need(q["@type"] === "Question" && q.acceptedAnswer?.text, "Question with acceptedAnswer.text");
        if (!visible.includes(q.name)) warn(label, `FAQ question not visible on page: "${q.name}"`);
        if (!visible.includes(q.acceptedAnswer.text)) warn(label, `FAQ answer not visible on page: "${q.name}"`);
        if (faqQuestions.has(q.name)) warn(label, `FAQ question also marked up on ${faqQuestions.get(q.name)}: "${q.name}"`);
        faqQuestions.set(q.name, label);
      }
    }
    p.summary = types.join(", ");
  }

  // internal links
  p.links = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => attr(m[0], "href")).filter(Boolean);
}

// ---- link + anchor resolution
for (const p of indexable.concat(pages.filter((x) => x.is404))) {
  for (const href of p.links ?? []) {
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [pathPart, frag] = href.split("#");
    const target = pathPart === "" ? p.urlPath : pathPart;
    if (!known.has(target)) {
      // Links to files (images, llms.txt, the press kit ZIP) must point at a file that exists in the export.
      if (/\.(png|webp|svg|jpg|ico|txt|xml|zip)$/.test(target)) { if (!fs.existsSync(path.join(out, target))) warn(p.urlPath, `link to missing file: ${href}`); }
      else warn(p.urlPath, `broken internal link: ${href}`);
      continue;
    }
    if (frag && !idsByPage.get(target)?.has(frag)) warn(p.urlPath, `anchor not found: ${href}`);
  }
}

// ---- inbound link graph (orphans) and click depth from home
const inbound = new Map(indexable.map((p) => [p.urlPath, new Set()]));
for (const p of indexable) for (const href of p.links) {
  const t = href.split("#")[0];
  if (t && inbound.has(t) && t !== p.urlPath) inbound.get(t).add(p.urlPath);
}
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const cur = queue.shift();
  const page = indexable.find((x) => x.urlPath === cur);
  for (const href of page.links) {
    const t = href.split("#")[0];
    if (t && known.has(t) && !depth.has(t) && t !== "/404/") { depth.set(t, depth.get(cur) + 1); queue.push(t); }
  }
}

// ---- sitemap / robots / llms / manifest
const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const expectedLocs = indexable.map((p) => ORIGIN + p.urlPath).sort();
if (JSON.stringify([...locs].sort()) !== JSON.stringify(expectedLocs)) warn("sitemap.xml", `URLs differ from built pages.\n   sitemap: ${locs.length}, pages: ${expectedLocs.length}`);
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
if (lastmods.length !== locs.length) warn("sitemap.xml", "lastmod count != loc count");
for (const block of sitemap.split("<url>").slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const firstImage = block.indexOf("<image:image>");
  if (firstImage !== -1 && block.indexOf("<lastmod>") > firstImage) warn("sitemap.xml", `<lastmod> must come before <image:image> (schema order): ${loc}`);
}
for (const d of lastmods) if (!/^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/.test(d)) warn("sitemap.xml", `bad lastmod: ${d}`);
const imgLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
for (const i of imgLocs) if (!fs.existsSync(path.join(out, new URL(i).pathname))) warn("sitemap.xml", `image not found: ${i}`);
const robots = fs.readFileSync(path.join(out, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) warn("robots.txt", "sitemap line missing");
if (/Disallow:\s*\//.test(robots)) warn("robots.txt", "Disallow found");
if (/^Host:/im.test(robots)) warn("robots.txt", "Host directive still present");
const llmsPath = path.join(out, "llms.txt");
if (!fs.existsSync(llmsPath)) warn("llms.txt", "missing");
const llms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, "utf8") : "";
for (const m of llms.matchAll(/\]\((https:\/\/[^)]*)\)/g)) {
  if (!m[1].startsWith(ORIGIN)) continue;
  const u = new URL(m[1]).pathname;
  if (!known.has(u)) warn("llms.txt", `link to missing page ${u}`);
}
const manifest = JSON.parse(fs.readFileSync(path.join(out, "manifest.webmanifest"), "utf8"));
for (const ic of manifest.icons) if (!fs.existsSync(path.join(out, ic.src))) warn("manifest", `icon missing ${ic.src}`);
const pressZip = path.join(out, "press", "ironbuddy-press-kit.zip");
if (fs.existsSync(pressZip) && fs.readFileSync(pressZip).readUInt32LE(0) !== 0x04034b50) warn("press kit", "ironbuddy-press-kit.zip is not a ZIP file");

// ---- report
console.log(`Pages checked: ${indexable.length} (+404)  |  Sitemap URLs: ${locs.length}  |  Sitemap images: ${imgLocs.length}`);
console.log(`FAQ questions marked up: ${faqQuestions.size} across ${new Set(faqQuestions.values()).size} pages`);
console.log("\nPage                                              inbound  depth  JSON-LD");
for (const p of indexable.sort((a, b) => a.urlPath.localeCompare(b.urlPath))) {
  console.log(`${p.urlPath.padEnd(50)}${String(inbound.get(p.urlPath).size).padStart(7)}  ${String(depth.get(p.urlPath) ?? "-").padStart(5)}  ${p.summary}`);
}
console.log(`\n${problems.length ? "PROBLEMS:\n" + problems.join("\n") : "No problems found."}`);
process.exitCode = problems.length ? 1 : 0;
