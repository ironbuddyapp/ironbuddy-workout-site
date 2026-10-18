/** Length of the free trial. Keep in sync with the privacy policy (section 4) and the Play listing. */
const freeTrialDays = 7;

/**
 * One-time price charged after the trial. Keep in sync with the Play listing. Google Play shows it in local
 * currency, so the amount a visitor sees there can differ slightly by country and tax.
 */
const price = { amount: "6.99", currency: "EUR", label: "€6.99" } as const;

const playStoreId = "com.ironbuddy.app";
/** The listing's canonical address, for structured data, app links and llms.txt. */
const playStoreUrl = `https://play.google.com/store/apps/details?id=${playStoreId}`;
/**
 * UTM tags for the site's own Play links, so installs from this website show up in Play Console under
 * Statistics / acquisition reports as "Tracked channels (UTM)". Play reads them from the URL-encoded `referrer`.
 */
const playReferrer = encodeURIComponent("utm_source=workout.ironbuddy.fit&utm_medium=website&utm_campaign=website");
const playStoreLinkUrl = `${playStoreUrl}&referrer=${playReferrer}`;

export const siteConfig = {
  name: "IronBuddy",
  /** The product's full name, as on the App Store. Use it where the app is named; titles keep the short name (50-60 characters). */
  fullName: "IronBuddy: Workout Tracker",
  tagline: "Your lifelong gym companion.",
  title: "IronBuddy: Workout Tracker & Gym Log App for Android",
  description:
    "Offline workout tracker and gym log for Android: log every set, plan splits, track progressive overload, customize your Home. No subscription, ads or account.",
  url: "https://workout.ironbuddy.fit",
  /** The brand home page, and the sister app's site. */
  brandUrl: "https://ironbuddy.fit",
  nutritionUrl: "https://nutrition.ironbuddy.fit",
  locale: "en_US",
  /**
   * LAUNCH SWITCH. True since the Play listing went public on 30 Sep 2026, so the Google Play badges link to the
   * listing and the Play URL is in the structured data. Set it back to false only if the listing is ever
   * unpublished: the badges then stop linking, so nobody lands on Play's "not found" page.
   */
  playListingLive: true as boolean,
  playStoreUrl,
  playStoreId,
  /** What the badges and the footer link to: the listing plus the UTM tags above. */
  playStoreLinkUrl,
  /** Opens the Play Store app directly from in-app browsers (Instagram, TikTok, ...), with the same UTM tags. */
  playStoreIntent: `intent://details?id=${playStoreId}&referrer=${playReferrer}#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(playStoreLinkUrl)};end`,
  playDeveloperUrl: "https://play.google.com/store/apps/developer?id=IronBuddy",
  /** GoatCounter endpoint for the website's page view counts (the app has no analytics). */
  goatcounterUrl: "https://ironbuddy.goatcounter.com/count",
  githubUrl: "https://github.com/ironbuddyapp",
  instagramUrl: "https://www.instagram.com/ironbuddy_app/",
  tiktokUrl: "https://www.tiktok.com/@ironbuddyapp",
  youtubeUrl: "https://www.youtube.com/@IronBuddyApp",
  /**
   * The two-minute tour on YouTube (also the promo video on the Play listing). The site links to it and
   * serves its own thumbnail; it is never embedded, so no request goes to Google until a visitor clicks.
   */
  promoVideo: {
    id: "JAVDVynLZ6Y",
    url: "https://youtu.be/JAVDVynLZ6Y",
    title: "IronBuddy: Offline Workout Tracker & Gym Log Mobile Application",
    description:
      "A two-minute tour of IronBuddy, the offline workout tracker for Android: starting the free trial, today's workout on Home with its Log button, Muscle Balance, logging a workout, the summary against last time, progress charts, the exercise library, training splits, customising your dashboard and calendar, accent colours and share cards. No account, no ads, no subscription.",
    // A full date and time with a time zone (Google's video markup rejects a bare date): the upload time
    // shown on the YouTube watch page. Update it, the duration and the thumbnail whenever the video is replaced.
    uploadDate: "2026-10-15T11:26:47-07:00",
    durationSeconds: 116,
    thumbnail: "/video/ironbuddy-promo.jpg",
    thumbnailWidth: 1280,
    thumbnailHeight: 720,
  },
  contactEmail: "iron.buddy.app@gmail.com",
  ogImage: "/og.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: "image/jpeg",
  ogImageAlt:
    "IronBuddy workout tracker app for Android: gym log and workout log that works offline. No account, no ads, no subscription.",
  freeTrialDays,
  price,
} as const;
