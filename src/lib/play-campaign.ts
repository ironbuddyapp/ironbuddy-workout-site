import { siteConfig } from "@/lib/site";

/*
 * Campaign tags for the site's Google Play links (Mike, D-6318, 2026-11-15). A visit that arrives with
 * ?utm_source=…&utm_campaign=… (a Facebook post, a YouTube description) passes those tags on to Play's `referrer`, so
 * Play Console shows the campaign under Statistics → "Tracked channels (UTM)". A visit without them keeps the site's
 * own tags (workout.ironbuddy.fit / website / website).
 *
 * The tags are read once from the address the visitor lands on and kept in memory for that visit only: nothing is
 * written to cookies or browser storage, so a new visit or a reload without tags starts from the site's own tags.
 */

export type PlayCampaign = { source: string; medium: string; campaign: string };

const SITE_CAMPAIGN: PlayCampaign = { source: "workout.ironbuddy.fit", medium: "website", campaign: "website" };

/** Letters, digits, dot, dash and underscore only, at most 60 characters: anything else is dropped. */
function clean(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim().slice(0, 60);
  return /^[A-Za-z0-9._-]+$/.test(trimmed) ? trimmed : null;
}

let captured: PlayCampaign | null = null;

/** Reads the landing address once per visit. Later calls (other pages in the same visit) keep the first result. */
export function captureCampaign(): PlayCampaign {
  if (captured) return captured;
  if (typeof window === "undefined") return SITE_CAMPAIGN;
  const params = new URLSearchParams(window.location.search);
  const source = clean(params.get("utm_source"));
  captured = source
    ? {
        source,
        medium: clean(params.get("utm_medium")) ?? "website",
        campaign: clean(params.get("utm_campaign")) ?? source,
      }
    : SITE_CAMPAIGN;
  return captured;
}

function referrer(c: PlayCampaign): string {
  return encodeURIComponent(`utm_source=${c.source}&utm_medium=${c.medium}&utm_campaign=${c.campaign}`);
}

/** The tagged Play web address for this visit. */
export function playLinkUrl(c: PlayCampaign = captureCampaign()): string {
  return `${siteConfig.playStoreUrl}&referrer=${referrer(c)}`;
}

/** The tagged in-app-browser intent (Instagram, TikTok, …) for this visit, falling back to the tagged web address. */
export function playIntentUrl(c: PlayCampaign = captureCampaign()): string {
  return `intent://details?id=${siteConfig.playStoreId}&referrer=${referrer(c)}#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(playLinkUrl(c))};end`;
}

/** Re-tags any link to IronBuddy's Play listing (web or intent); returns null for other links. */
export function retagPlayLink(href: string): string | null {
  if (href.startsWith(siteConfig.playStoreUrl)) return playLinkUrl();
  if (href.startsWith(`intent://details?id=${siteConfig.playStoreId}`)) return playIntentUrl();
  return null;
}
