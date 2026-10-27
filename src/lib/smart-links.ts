import { showAppStoreBadge } from "@/lib/iphone";
import { siteConfig } from "@/lib/site";

/*
 * Smart store links for social bios (Marketing brief, 2026-10-23): one address per source that sends each visitor
 * to the right store, tags the visit and counts it in GoatCounter.
 *
 *   Android         → the tagged Google Play URL, exactly like the older forward pages /play, /play-fb, /play-ig
 *                     (public/play*), which stay as they are. Counted as the source's event before leaving.
 *   iPhone and iPad → /soon-iphone/ (no iOS app yet), which counts soon-iphone-workout.
 *   Everyone else   → a short page with the tagged Google Play badge and the "coming to iPhone" line; a click on
 *                     the badge counts the source's event.
 *
 * The pages are plain HTML, outside the site layout: noindex, not in the sitemap, linked from nowhere on the site.
 * scripts/check-seo.mjs skips them by their `ironbuddy-page: forward` meta tag. Never state a price or an iOS date.
 * When the iOS app is live, the iPhone branch switches to the App Store URL (Marketing sends the URLs).
 */

type SmartLink = {
  /** Play Console reads these from the URL-encoded `referrer` (Statistics → "Tracked channels (UTM)"). */
  utm: string;
  /** GoatCounter event name. bio-play, bio-play-fb and bio-play-personal are shared with /play, /play-fb, /play-ig. */
  event: string;
  /** The event's title in GoatCounter. */
  title: string;
};

export const smartLinks = {
  get: { utm: "utm_source=instagram&utm_medium=bio&utm_campaign=bio", event: "bio-play", title: "Instagram bio to Google Play" },
  "get-fb": { utm: "utm_source=facebook&utm_medium=bio&utm_campaign=bio", event: "bio-play-fb", title: "Facebook bio to Google Play" },
  "get-ig": { utm: "utm_source=instagram&utm_medium=personal&utm_campaign=bio", event: "bio-play-personal", title: "Instagram personal to Google Play" },
} satisfies Record<string, SmartLink>;

export type SmartLinkName = keyof typeof smartLinks;

const soonEvent = "soon-iphone-workout";
const playUrl = (utm: string) => `${siteConfig.playStoreUrl}&referrer=${encodeURIComponent(utm)}`;
const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const googleBadge = (target: string) =>
  `<a class="badge" href="${escapeHtml(target)}"><img src="/badges/google-play-badge.svg" alt="Get it on Google Play" width="180" height="53"></a>`;
/**
 * The store badges. While the App Store badge shows (badge-only switch), Apple's badge sits beside Google Play at
 * the same height, as a plain image with no link. It is not inside a `.badge` link, so the click count and the
 * Google Play address do not change; the Google Play link stays the first `.badge` on the page (the scripts use it).
 */
const storeBadges = (target: string) =>
  showAppStoreBadge
    ? `<div class="badges">${googleBadge(target)}<img src="/badges/app-store-badge.svg" alt="IronBuddy: Workout Tracker on the App Store" width="159" height="53"></div>`
    : googleBadge(target);
const appleTrademark = showAppStoreBadge
  ? `\n<p class="tm">Apple, the Apple logo, iPhone and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.</p>`
  : "";
/** A JSON value that is safe inside an inline <script>. */
const js = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

const style = `@font-face{font-family:"Plus Jakarta Sans";font-weight:400 600;font-display:swap;src:url(/fonts/plus-jakarta-sans/latin.woff2) format("woff2")}
body{margin:0;background:#050b14;color:#a8b0bd;font:16px "Plus Jakarta Sans",system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center}
main{max-width:22rem;padding:2rem 1rem}h1{color:#fff;font-size:1.35rem;font-weight:600;margin:1rem 0 .75rem}p{line-height:1.5;margin:.75rem 0}a{color:#b7ff2a}
.badge{display:inline-block;margin:.5rem 0}.badge img{display:block}.badges{display:flex;justify-content:center;align-items:center;gap:.75rem;margin:.5rem 0}.badges .badge{margin:0}.badges img{height:40px;width:auto}.tm{font-size:.75rem;color:#7c8594}.opening{display:none}.android .opening{display:block}.android .store{display:none}`;

function page({ title, head = "", body, script }: { title: string; head?: string; body: string; script: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="ironbuddy-page" content="forward">
<title>${escapeHtml(title)}</title>
<link rel="icon" href="/favicon.ico">
<style>${style}</style>
${head}</head>
<body>
<main>
<img src="/logo-mark.png" alt="" width="64" height="64">
${body}
</main>
<script data-goatcounter="${siteConfig.goatcounterUrl}" data-goatcounter-settings='{"no_onload":true}' async src="//gc.zgo.at/count.js"></script>
<script>
(function () {
  var gc = document.querySelector("script[data-goatcounter]");
  function count(vars) {
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count(vars);
    else gc.addEventListener("load", function () { window.goatcounter.count(vars); });
  }
${script}
})();
</script>
</body>
</html>
`;
}

function html(markup: string) {
  return new Response(markup, { headers: { "content-type": "text/html; charset=utf-8" } });
}

/** /get, /get-fb, /get-ig. */
export function smartLinkPage(name: SmartLinkName) {
  const link = smartLinks[name];
  const target = playUrl(link.utm);
  // Runs before the page paints: iPhone and iPad leave at once, Android swaps the badge for "Opening Google Play".
  // iPadOS reports itself as a Mac, so a Mac with a touch screen counts as an iPad.
  const head = `<script>
(function () {
  var ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) location.replace(${js(`/soon-iphone/?from=${name}`)});
  else if (/Android/i.test(ua)) document.documentElement.className = "android";
})();
</script>
`;
  const body = `<h1>${escapeHtml(siteConfig.fullName)}</h1>
<p class="opening">Opening Google Play&hellip; <a href="${escapeHtml(target)}">Tap here if nothing happens</a></p>
<div class="store">
${storeBadges(target)}
<p>IronBuddy is coming to iPhone.</p>${appleTrademark}
</div>`;
  // Android: count, then leave (the same timings as /play). Others: count a click on the badge (count.js sends
  // with sendBeacon, so the click is recorded as the link leaves the page).
  const script = `  var event = { event: true, path: ${js(link.event)}, title: ${js(link.title)} };
  if (document.documentElement.className === "android") {
    var done = false;
    var go = function () { if (!done) { done = true; location.replace(${js(target)}); } };
    count(event);
    if (window.goatcounter && window.goatcounter.count) setTimeout(go, 250);
    else gc.addEventListener("load", function () { setTimeout(go, 250); });
    setTimeout(go, 1500);
  } else {
    document.querySelector(".badge").addEventListener("click", function () { count(event); });
  }`;
  return html(page({ title: siteConfig.fullName, head, body, script }));
}

/** /soon-iphone/: where the smart links send iPhone and iPad visitors until the iOS app is live. */
export function soonIphonePage() {
  const fallback = siteConfig.playStoreLinkUrl;
  const targets = Object.fromEntries(Object.entries(smartLinks).map(([name, link]) => [name, playUrl(link.utm)]));
  const body = `<h1>IronBuddy is coming to iPhone.</h1>
<p>An iOS version is on our roadmap, and we&rsquo;ll share news about availability as soon as we can.</p>
<p>On Android? Get ${escapeHtml(siteConfig.fullName)} on Google Play.</p>
${storeBadges(fallback)}${appleTrademark}`;
  // ?from=<smart link> keeps the source: the Play badge gets that link's tags and the event title names it.
  const script = `  var from = new URLSearchParams(location.search).get("from");
  var targets = ${js(targets)};
  if (from && Object.prototype.hasOwnProperty.call(targets, from)) document.querySelector(".badge").href = targets[from];
  else from = null;
  count({ event: true, path: ${js(soonEvent)}, title: "Soon on iPhone" + (from ? " (/" + from + ")" : "") });`;
  return html(page({ title: `${siteConfig.name} on iPhone`, body, script }));
}
