import { appStoreUrl } from "@/lib/iphone";
import { escapeHtml, html, js, page } from "@/lib/smart-links";
import { siteConfig } from "@/lib/site";

/*
 * iPhone store links for social bios (Mike, 2026-10-27): the same three sources as /get, /get-fb and /get-ig,
 * for the App Store only. Google Play has its own links (/get, /get-fb, /get-ig, /play*), so these pages show no
 * Google Play badge. The app is not live yet, so every visitor sees one page: Apple's badge as a plain image
 * (no link) and Apple's trademark line. No redirects, no price, no date.
 * Plain HTML outside the site layout: noindex, not in the sitemap, linked from nowhere. scripts/check-seo.mjs
 * skips the pages by their `ironbuddy-page: forward` meta tag.
 *
 * When Mike says the iPhone app is live and gives the App Store address (`appStoreUrl` in src/lib/iphone.ts, plus
 * Marketing's campaign tokens), the badge becomes the link and the "not available yet" line goes.
 */

type IosLink = {
  /** GoatCounter event for a visit to this page. */
  visitEvent: string;
  /** The visit event's title in GoatCounter. */
  title: string;
};

export const iosLinks = {
  "get-ios": { visitEvent: "ios-bio-app-store", title: "iPhone link: Instagram bio" },
  "get-ios-fb": { visitEvent: "ios-bio-app-store-fb", title: "iPhone link: Facebook page" },
  "get-ios-ig": { visitEvent: "ios-bio-app-store-personal", title: "iPhone link: Instagram personal" },
} satisfies Record<string, IosLink>;

export type IosLinkName = keyof typeof iosLinks;

/** The Apple badge: a plain image until the app is live, the App Store link after. */
export const appStoreBadgeHtml = () =>
  appStoreUrl
    ? `<a class="badge" href="${escapeHtml(appStoreUrl)}"><img src="/badges/app-store-badge.svg" alt="Download on the App Store" width="159" height="53"></a>`
    : `<img class="appstore" src="/badges/app-store-badge.svg" alt="IronBuddy: Workout Tracker on the App Store" width="159" height="53">`;

export const appleTrademarkHtml = `<p class="tm">Apple, the Apple logo, iPhone and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.</p>`;

export const appleBadgeStyle = `<style>.appstore{display:block;margin:.5rem auto;height:40px;width:auto}.tm{font-size:.75rem;color:#7c8594}</style>\n`;

/** /get-ios, /get-ios-fb, /get-ios-ig. */
export function iosLinkPage(name: IosLinkName) {
  const link = iosLinks[name];
  const body = `<h1>${escapeHtml(siteConfig.fullName)}</h1>
${appStoreBadgeHtml()}
<p>The iPhone app is on its way. It is not available to download yet.</p>
${appleTrademarkHtml}`;
  // There is no link to click, so the visit is counted when the page opens.
  const script = `  count({ event: true, path: ${js(link.visitEvent)}, title: ${js(link.title)} });`;
  return html(page({ title: siteConfig.fullName, head: appleBadgeStyle, body, script }));
}
