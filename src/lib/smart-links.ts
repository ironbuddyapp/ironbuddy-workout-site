import { appStoreBadgeHtml, appleBadgeStyle, appleTrademarkHtml } from "@/lib/ios-links";
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
export const playUrl = (utm: string) => `${siteConfig.playStoreUrl}&referrer=${encodeURIComponent(utm)}`;
export const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** A JSON value that is safe inside an inline <script>. */
export const js = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

const style = `@font-face{font-family:"Plus Jakarta Sans";font-weight:400 600;font-display:swap;src:url(/fonts/plus-jakarta-sans/latin.woff2) format("woff2")}
body{margin:0;background:#050b14;color:#a8b0bd;font:16px "Plus Jakarta Sans",system-ui,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center}
main{max-width:22rem;padding:2rem 1rem}h1{color:#fff;font-size:1.35rem;font-weight:600;margin:1rem 0 .75rem}p{line-height:1.5;margin:.75rem 0}a{color:#b7ff2a}
.badge{display:inline-block;margin:.5rem 0}.badge img{display:block}.opening{display:none}.android .opening{display:block}.android .store{display:none}`;

export function page({ title, head = "", body, script }: { title: string; head?: string; body: string; script: string }) {
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

export function html(markup: string) {
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
<a class="badge" href="${escapeHtml(target)}"><img src="/badges/google-play-badge.svg" alt="Get it on Google Play" width="180" height="53"></a>
<p>IronBuddy is coming to iPhone.</p>
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
  const targets = smartLinks;
  // Apple's badge only (Mike, 2026-10-27): Google Play has its own links. The badge is a plain image until the app is live.
  const body = `<h1>IronBuddy is coming to iPhone.</h1>
<p>An iOS version is on our roadmap, and we&rsquo;ll share news about availability as soon as we can.</p>
${appStoreBadgeHtml()}
${appleTrademarkHtml}`;
  // ?from=<smart link> keeps the source: the event title names it.
  const script = `  var from = new URLSearchParams(location.search).get("from");
  var targets = ${js(Object.keys(targets))};
  if (targets.indexOf(from) < 0) from = null;
  count({ event: true, path: ${js(soonEvent)}, title: "Soon on iPhone" + (from ? " (/" + from + ")" : "") });`;
  return html(page({ title: `${siteConfig.name} on iPhone`, head: appleBadgeStyle, body, script }));
}
