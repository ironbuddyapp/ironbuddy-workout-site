import { siteConfig } from "@/lib/site";

/**
 * IPHONE SWITCH. False until Mike says IronBuddy: Workout Tracker is live on the App Store. While it is false
 * every page builds exactly as before: Android wording, no App Store badge. Set it to true to switch the pages
 * to the iPhone wording and show the App Store badge; add `appStoreUrl` once Mike gives the App Store address.
 *
 * Kept out of src/lib/site.ts on purpose: site.ts is bundled into client code (GooglePlayButton), so a new field
 * there would change every page's script files even with the switch off. Import this file from server code only.
 */
export const iphoneListingLive = false as boolean;

/**
 * The App Store listing (the app's Apple ID is 6827257978). Empty until Mike says the app is live: the badge then
 * shows as a plain image without a link, and no App Store address appears anywhere on the site.
 */
export const appStoreUrl = "" as string;

/** The iPhone wording while the switch is on, today's wording otherwise. */
export function onIphone<T>(iphone: T, today: T): T {
  return iphoneListingLive ? iphone : today;
}

/** FAQ answers (by id, see faqGroups in src/lib/content.ts) that change once the iPhone app is live. */
const iphoneFaqAnswers: Record<string, string> = {
  iphone:
    "Yes. IronBuddy: Workout Tracker is on the App Store for iPhone and on Google Play for Android. On both, your workouts are stored on your phone, with no account and no ads.",
  subscription: `No. IronBuddy has no subscriptions. It is free to download and includes a free trial (currently ${siteConfig.freeTrialDays} days). After the trial, a one-time in-app purchase through Google Play or the App Store is required to keep logging and editing after the trial.`,
};

/** The FAQ items with their iPhone answers while the switch is on; the same array otherwise. */
export function withIphoneFaqs<T extends { id: string; answer: string }>(items: T[]): T[] {
  if (!iphoneListingLive) return items;
  return items.map((item) => (item.id in iphoneFaqAnswers ? { ...item, answer: iphoneFaqAnswers[item.id] } : item));
}
