import type { Metadata } from "next";
import type { PageDef } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/** The <title> as users and social cards see it (the home page title already carries the brand). */
export function fullTitle(page: PageDef) {
  return page.kind === "home" ? page.title : `${page.title} | ${siteConfig.name}`;
}

export const ogImage = {
  url: absoluteUrl(siteConfig.ogImage),
  width: siteConfig.ogImageWidth,
  height: siteConfig.ogImageHeight,
  alt: siteConfig.ogImageAlt,
  type: siteConfig.ogImageType,
};

/**
 * Builds a complete metadata object for a page.
 *
 * Next.js merges metadata shallowly, so a page-level `openGraph` or `twitter` replaces the layout's
 * entirely. Every field a crawler needs (image, site name, locale, canonical) is therefore set here
 * for each page instead of being inherited from the root layout.
 */
export function pageMetadata(page: PageDef): Metadata {
  const title = fullTitle(page);
  const url = absoluteUrl(page.path);
  const shared = {
    url,
    siteName: siteConfig.fullName,
    locale: siteConfig.locale,
    title,
    description: page.description,
    images: [ogImage],
  };

  return {
    title: page.kind === "home" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph:
      page.kind === "guide"
        ? {
            ...shared,
            type: "article",
            publishedTime: page.published,
            modifiedTime: page.modified,
          }
        : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}
