import { pageList } from "@/lib/pages";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * One entry per page in src/lib/pages.ts, so a new page is listed the moment it is registered.
 *
 * This is a route handler instead of Next's sitemap.ts convention on purpose: Next writes the
 * <image:image> elements before <lastmod>, but the sitemap schema puts <lastmod> first. Google accepts
 * either order; a stricter parser might not, so the schema order is used here. changefreq and priority are
 * omitted: Google ignores both, and stale hand-set values are worse than none.
 */
export function GET() {
  const entries = pageList.map((page) => {
    const images = (page.images ?? []).map(
      (image) =>
        `    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(image))}</image:loc>\n    </image:image>`,
    );
    return [
      "  <url>",
      `    <loc>${escapeXml(absoluteUrl(page.path))}</loc>`,
      `    <lastmod>${page.modified}</lastmod>`,
      ...images,
      "  </url>",
    ].join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
