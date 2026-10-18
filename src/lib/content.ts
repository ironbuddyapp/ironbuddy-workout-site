import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export const heroBullets = [
  "No Account Required",
  "Works Offline",
  "One-Time Purchase",
  "No Ads",
  "No Subscription",
  "Free Trial Included",
] as const;

/** Compact benefit line shown under the hero headline on small screens. */
export const heroHighlights = ["Offline", "No ads", "No account", "Free trial"] as const;

export type FeatureIcon =
  | "clipboard"
  | "calendar"
  | "chart"
  | "scale"
  | "library"
  | "shield"
  | "body"
  | "layout"
  | "share";

export const features: Array<{
  title: string;
  description: string;
  icon: FeatureIcon;
  /** The page that explains the feature (the card links there). */
  href: string;
}> = [
  {
    title: "Workout Log",
    description:
      "Sets, reps, weight and notes for every workout.",
    icon: "clipboard",
    href: pages.setTechniques.path,
  },
  {
    title: "Training Splits",
    description:
      "Push Pull Legs, Upper Lower, Full Body, or your own.",
    icon: "calendar",
    href: pages.trainingSplits.path,
  },
  {
    title: "Progressive Overload Tracking",
    description: "Follow 1RM, volume and personal records over time.",
    icon: "chart",
    href: pages.progressCharts.path,
  },
  {
    title: "Muscles Worked & Balance",
    description: "See which muscles you trained and what you skipped.",
    icon: "body",
    href: pages.muscleBalance.path,
  },
  {
    title: "Body Weight & Body Fat",
    description: "Track body weight and body fat % in one place.",
    icon: "scale",
    href: `${pages.progressCharts.path}#body`,
  },
  {
    title: "800+ Exercise Library",
    description: "Form demos, with muscle and equipment filters.",
    icon: "library",
    href: pages.exerciseLibrary.path,
  },
  {
    title: "Customizable Home",
    description: "Arrange widgets, pick your calendar look.",
    icon: "layout",
    href: pages.customizableHome.path,
  },
  {
    title: "Share Cards",
    description: "Workouts, records and charts as images (full version).",
    icon: "share",
    href: pages.shareCards.path,
  },
  {
    title: "Offline & Private",
    description: "Works offline, stored on your phone, no account.",
    icon: "shield",
    href: pages.offline.path,
  },
];

/**
 * App screenshots in public/screenshots/ (WebP, recorded 15 October 2026 from app 2.0.6 with sample data). `carousel: true`
 * marks the current set: it drives the home page carousel, the app's structured data and the image sitemap.
 * Keep the array in carousel order.
 *
 * Alt text leads with the search term the screen matches (a different one per image), stays under about 125
 * characters, and keeps one concrete detail. File names are descriptive for Google Images; if you rename one,
 * update screenshotImages in pages.ts too.
 */
export const screenshots = [
  {
    id: "dashboard",
    file: "ironbuddy-workout-tracker-home.webp",
    label: "Dashboard",
    alt: "IronBuddy Android workout tracker home screen: today's Legs workout with one Log button above a Push/Pull/Legs week",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "logging",
    file: "ironbuddy-workout-log.webp",
    label: "Workout Logging",
    alt: "IronBuddy workout log: reps and weight for each set of hack squat on a legs day",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "splits",
    file: "ironbuddy-training-splits.webp",
    label: "Training Splits",
    alt: "IronBuddy training split presets with their level: Arnold Split and PHAT (Advanced), then Push/Pull/Legs (6×), Bro Split, PHUL, 5/3/1 and Push/Pull (Intermediate), with filters",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "progress",
    file: "ironbuddy-training-volume.webp",
    label: "Training Volume",
    alt: "IronBuddy training volume chart: total volume per workout over 12 weeks and the average per workout",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "strength",
    file: "ironbuddy-estimated-1rm-chart.webp",
    label: "1RM Chart",
    alt: "IronBuddy progressive overload tracking: hack squat estimated 1RM chart, up 35 kg since the first session",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "metrics",
    file: "ironbuddy-body-weight-tracker.webp",
    label: "Body Metrics",
    alt: "IronBuddy body weight and body fat % tracker with three months of charts",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "library",
    file: "ironbuddy-exercise-library.webp",
    label: "Exercise Library",
    alt: "IronBuddy exercise library with recently done exercises, A–Z or Recent sorting and a filter button",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "balance",
    file: "ironbuddy-muscle-balance.webp",
    label: "Muscle Balance",
    alt: "IronBuddy Muscle Balance: working sets per body area this week against last week",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "summary",
    file: "ironbuddy-workout-summary.webp",
    label: "Workout Summary",
    alt: "IronBuddy workout summary: each exercise against last time, with new personal records marked",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "share",
    file: "ironbuddy-share-card.webp",
    label: "Share Cards",
    alt: "IronBuddy share card: a new hack squat personal record as an image to share",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "exercise",
    file: "ironbuddy-exercise-page.webp",
    label: "Exercise Page",
    alt: "IronBuddy exercise page for the leverage chest press: form demo, last workout and personal records",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "customise",
    file: "ironbuddy-customizable-home.webp",
    label: "Customizable Home",
    alt: "IronBuddy customizable home screen: widgets with remove and resize handles, Add, Calendar look, Reset and Done",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "colors",
    file: "ironbuddy-accent-colors.webp",
    label: "Accent Colors",
    alt: "IronBuddy appearance settings: dark theme and accent colors, with Gold picked and saved",
    width: 720,
    height: 1516,
    carousel: true,
  },
  {
    id: "data",
    file: "ironbuddy-offline-data.webp",
    label: "Your Data",
    alt: "IronBuddy data settings: Android backup, JSON export and import, undo import and a split plan PDF",
    width: 720,
    height: 1516,
    carousel: true,
  },
  // Screens for the feature pages (not in the home carousel).
  {
    id: "techniques",
    file: "ironbuddy-set-techniques.webp",
    label: "Set Techniques",
    alt: "IronBuddy workout log with a drop set on the first set of hack squat: each drop has its own reps and weight",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "filters",
    file: "ironbuddy-exercise-filters.webp",
    label: "Exercise Filters",
    alt: "IronBuddy exercise library filters: muscle groups and equipment, with Chest and Machine selected",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "presets",
    file: "ironbuddy-split-presets.webp",
    label: "Split Presets",
    alt: "IronBuddy preset training splits filtered to four days a week: PHUL and Push / Pull (Intermediate), Upper / Lower (Beginner)",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "shareChart",
    file: "ironbuddy-share-chart.webp",
    label: "Share a Chart",
    alt: "IronBuddy share card of a hack squat best-weight chart, ready to share or save as an image",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "balanceExplained",
    file: "ironbuddy-muscle-balance-explained.webp",
    label: "Muscle Balance Explained",
    alt: "IronBuddy's Muscle Balance widget with its explanation open: every set counts once, for the main muscle of the exercise",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "records",
    file: "ironbuddy-personal-records.webp",
    label: "Personal Records",
    alt: "IronBuddy exercise page: last workout with sets, best set and estimated 1RM, and the records with their dates",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "customiseSizes",
    file: "ironbuddy-customise-sizes.webp",
    label: "Widget Sizes",
    alt: "IronBuddy Customise Home with a widget's size menu open: Small, Wide, Tall or Large",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "calendarLook",
    file: "ironbuddy-calendar-look.webp",
    label: "Calendar Look",
    alt: "IronBuddy calendar look settings: five day styles, five progress styles and the greeting above the calendar",
    width: 720,
    height: 1516,
    carousel: false,
  },
  {
    id: "missedDay",
    file: "ironbuddy-missed-day.webp",
    label: "Missed Day",
    alt: "IronBuddy workout calendar with a missed day: Missed Push on Mon 12, Move to Sat 17, and today's Legs ready to log",
    width: 720,
    height: 1516,
    carousel: false,
  },
] as const;

/** The current screenshot set (see above). */
export const appScreenshots = screenshots.filter((shot) => shot.carousel);

/** Public path of a screenshot, e.g. "/screenshots/ironbuddy-workout-log.webp". */
export function screenshotSrc(id: ScreenshotId) {
  const shot = screenshots.find((item) => item.id === id);
  if (!shot) throw new Error(`Unknown screenshot: ${id}`);
  return `/screenshots/${shot.file}`;
}

export type ScreenshotId = (typeof screenshots)[number]["id"];

/**
 * Only IronBuddy's own attributes are stated as fact (they come from the privacy policy). The other
 * column is deliberately hedged: it describes how apps in general vary, not any specific app.
 */
export const comparisonRows = [
  { feature: "Works offline", ironbuddy: "Yes", others: "Varies by app" },
  { feature: "Account required", ironbuddy: "No", others: "Often required" },
  { feature: "Subscription", ironbuddy: "None", others: "Common" },
  { feature: "Ads", ironbuddy: "None", others: "Common in free tiers" },
  { feature: "Where data lives", ironbuddy: "On your device", others: "Often in the cloud" },
] as const;

export type Faq = {
  id: string;
  question: string;
  answer: string;
  more?: { href: string; label: string };
};

const trial = `free trial (currently ${siteConfig.freeTrialDays} days)`;

/**
 * What the free trial includes and what happens after it, in one place so every page says the same thing.
 * Source: IronBuddy app 2.0 (7-day trial of the whole tracker; the full version adds export, import, the local
 * data copy, share cards, a customizable Home and accent colors; read-only afterwards; Android backup works in both).
 */
export const trialDetails = {
  includes: `The ${siteConfig.freeTrialDays}-day free trial includes the whole workout tracker: workout logging, progress charts, body metrics, the full library of 800+ exercises, every split and your own custom splits.`,
  unlocks: `Buying IronBuddy for ${siteConfig.price.label} keeps everything unlocked after the trial, and adds export and import of your data, a local copy of your data kept on your phone, share cards, a customizable Home and accent colors. In both the trial and the full version, Android's own backup protects your data if Google backup is turned on.`,
  afterTrial:
    "If you don't buy, the app becomes read-only when the trial ends: nothing is deleted and your data stays visible on your phone, but logging and editing need the purchase.",
} as const;

export const faqGroups: Array<{ id: string; title: string; items: Faq[] }> = [
  {
    id: "offline-use",
    title: "Offline use",
    items: [
      {
        id: "offline",
        question: "Does IronBuddy work offline?",
        answer:
          "Yes. IronBuddy is offline-first: you can log workouts, review your history, and browse the exercise library with no internet connection. Your training data is stored on your phone, so there is no server to reach and nothing to sync.",
        more: { href: pages.offline.path, label: "How offline tracking works" },
      },
      {
        id: "gym-no-internet",
        question: "Can I use IronBuddy in a gym with no internet connection?",
        answer:
          "Yes. A basement gym, a garage gym, or a gym with no signal works the same as any other, because logging sets, reps, and weight does not need a connection. The only steps that use the internet are getting the app from Google Play and completing the one-time purchase.",
      },
      {
        id: "why-offline",
        question: "Why choose an offline workout tracker?",
        answer:
          "An offline tracker keeps working when the signal does not, and your training log does not depend on a company account or server. With IronBuddy there is no account to create, no cloud sync to wait on, and your workouts are stored on your device. The trade-off is that backups are your responsibility, so IronBuddy supports both an automatic backup file and manual exports.",
      },
    ],
  },
  {
    id: "pricing-and-ads",
    title: "Pricing, trial, and ads",
    items: [
      {
        id: "subscription",
        question: "Does IronBuddy require a subscription?",
        answer: `No. IronBuddy has no subscriptions. It is free to download and includes a ${trial}. After the trial, a one-time in-app purchase of ${siteConfig.price.label} through Google Play is required to keep logging and editing after the trial.`,
        more: { href: pages.noSubscription.path, label: "How pricing works" },
      },
      {
        id: "ads",
        question: "Does IronBuddy contain ads?",
        answer:
          "No. IronBuddy shows no ads and includes no advertising or third-party analytics SDKs, so nothing interrupts your sets.",
      },
      {
        id: "trial-includes",
        question: "What is included in the free trial?",
        answer: `${trialDetails.includes} ${trialDetails.unlocks}`,
      },
      {
        id: "trial-ends",
        question: "What happens when the free trial ends?",
        answer: `The app becomes read-only until you buy it for ${siteConfig.price.label}. Nothing is deleted: your workouts, splits and history stay on your phone and stay visible, but logging and editing need the purchase.`,
        more: { href: pages.noSubscription.path, label: "How pricing works" },
      },
    ],
  },
  {
    id: "privacy-and-data",
    title: "Accounts, privacy, and data",
    items: [
      {
        id: "account",
        question: "Can I use IronBuddy without creating an account?",
        answer:
          "Yes. IronBuddy does not create user accounts or require sign-in, so there is no sign-up, email address, or password to manage. It is built so your training log belongs to you: it is stored on your phone, not in a cloud account we control.",
      },
      {
        id: "storage",
        question: "Where is my workout data stored?",
        answer:
          "On your device. Your workouts, splits, notes, body metrics, and settings are stored in the app's on-device storage, and IronBuddy does not send them to any IronBuddy server. Copies exist only in ways you control or Android provides: in the full version an automatic backup file in your Downloads folder (you can turn it off), Android Auto Backup to your Google account if Google backup is on, and files you export or share.",
        more: { href: pages.privacyFocused.path, label: "Privacy in detail" },
      },
      {
        id: "collect-sell",
        question: "Does IronBuddy collect or sell my data?",
        answer:
          "IronBuddy does not sell personal data, does not use advertising SDKs, and does not use third-party analytics or crash SDKs that report your workouts to us. Your training data is not collected onto IronBuddy-operated servers. The privacy policy explains exactly what the app handles.",
        more: { href: pages.privacy.path, label: "Read the privacy policy" },
      },
      {
        id: "transfer",
        question: "Can I back up, export, or move my data to another phone?",
        answer:
          "Yes. In the full version you can export a JSON copy of your data and import a backup file on another device you own, and IronBuddy keeps an automatic backup file in your Downloads folder (you can turn it off in Settings). A PDF of your active split can be saved or shared in any version, and Android's own backup works in any version if Google backup is on. During the free trial, Android's backup is what protects your data. Nothing is uploaded to IronBuddy servers.",
      },
      {
        id: "uninstall",
        question: "What happens to my data if I uninstall IronBuddy?",
        answer:
          "Uninstalling removes the app's private storage. Backup files already saved in your Downloads folder, files you exported, and any Android Auto Backup in your Google account are not removed automatically, so you can restore later or delete them yourself. Settings, then Reset All Data, clears what IronBuddy stores on the device.",
      },
    ],
  },
  {
    id: "features-and-progress",
    title: "Features and progress tracking",
    items: [
      {
        id: "overload",
        question: "Is IronBuddy good for progressive overload tracking?",
        answer:
          "IronBuddy records the numbers progressive overload depends on: sets, reps, and weight for every workout, plus notes. The Progress tab charts your training volume and 1RM (one-rep max), calculated with the Epley formula, over time, from one week to all time, so you can see whether your training is trending up.",
        more: { href: pages.progressiveOverload.path, label: "A simple method for tracking progressive overload" },
      },
      {
        id: "estimated-1rm",
        question: "How does IronBuddy calculate my 1RM?",
        answer:
          "With the Epley formula: weight × (1 + reps ÷ 30). For each workout, IronBuddy uses the completed set that gives the highest estimate, and counts sets of more than 12 reps as 12, where the formula stops being reliable. Progress → Exercises → 1RM charts the result over time, and each exercise's Records show your best estimated 1RM.",
        more: { href: `${pages.progressiveOverload.path}#volume-and-1rm`, label: "1RM explained" },
      },
      {
        id: "what-track",
        question: "What can I track in IronBuddy?",
        answer:
          "You can log sets, reps, weight, and notes for each workout, follow a training split, chart workout volume, best weight and 1RM, see the muscles you worked and your Muscle Balance for the week, and record body weight and body fat percentage. An exercise library of more than 800 exercises with demonstration thumbnails and target muscles helps you find the right movement.",
        more: { href: pages.features.path, label: "All features" },
      },
      {
        id: "splits",
        question: "Can I build my own training split?",
        answer:
          "Yes. Start from a template such as Full Body 3×, Upper/Lower, Push/Pull/Legs, Bro Split, or Arnold Split, or create a custom program. You can add days, change the exercises on each day, and choose which split is active.",
      },
      {
        id: "units",
        question: "Does IronBuddy use kilograms or pounds?",
        answer: "Both. You can choose your unit preference (kg or lb) in the app.",
      },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    items: [
      {
        id: "iphone",
        question: "Is IronBuddy available on iPhone?",
        answer: "Not yet. IronBuddy is currently available on Android through Google Play.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((group) => group.items);

/** The short list shown on the home page. The complete list (and its FAQPage markup) lives on /faq/. */
export const homeFaqIds = ["offline", "subscription", "ads", "account", "storage", "overload"] as const;

export const homeFaqs: Faq[] = homeFaqIds.map((id) => {
  const item = allFaqs.find((faq) => faq.id === id);
  if (!item) throw new Error(`Unknown FAQ id: ${id}`);
  return item;
});

export const navItems = [
  { label: "Features", href: pages.features.path, desktop: true },
  { label: "Screenshots", href: "/#screenshots", desktop: true },
  { label: "Guides", href: pages.guides.path, desktop: true },
  { label: "FAQ", href: pages.faq.path, desktop: true },
  { label: "About", href: pages.about.path, desktop: true },
  { label: "What's new", href: pages.whatsNew.path, desktop: false },
  { label: "Contact", href: pages.contact.path, desktop: false },
  { label: "Privacy Policy", href: pages.privacy.path, desktop: false },
  { label: "Download", href: "/#download", desktop: false },
] as const;

/** Sections of the home page, used by the mobile dot navigation and the "Explore" auto-scroll. */
export const sectionNav = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "screenshots", label: "Screenshots" },
  { id: "why", label: "Compare" },
  { id: "faq", label: "FAQ" },
  { id: "download", label: "Download" },
] as const;

export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: pages.features.path },
      { label: pages.whatsNew.label, href: pages.whatsNew.path },
      { label: "Screenshots", href: "/#screenshots" },
      { label: "FAQ", href: pages.faq.path },
    ],
  },
  {
    title: "Features",
    links: [
      { label: pages.customizableHome.label, href: pages.customizableHome.path },
      { label: pages.muscleBalance.label, href: pages.muscleBalance.path },
      { label: pages.workoutSummary.label, href: pages.workoutSummary.path },
      { label: pages.progressCharts.label, href: pages.progressCharts.path },
      { label: pages.shareCards.label, href: pages.shareCards.path },
      { label: pages.exerciseLibrary.label, href: pages.exerciseLibrary.path },
      { label: pages.trainingSplits.label, href: pages.trainingSplits.path },
      { label: pages.setTechniques.label, href: pages.setTechniques.path },
    ],
  },
  {
    title: "Why IronBuddy",
    links: [
      { label: pages.offline.label, href: pages.offline.path },
      { label: pages.noSubscription.label, href: pages.noSubscription.path },
      { label: pages.privacyFocused.label, href: pages.privacyFocused.path },
      { label: pages.alternatives.label, href: pages.alternatives.path },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "All guides", href: pages.guides.path },
      { label: pages.progressiveOverload.label, href: pages.progressiveOverload.path },
      { label: pages.logWorkouts.label, href: pages.logWorkouts.path },
      { label: pages.pushPullLegs.label, href: pages.pushPullLegs.path },
      { label: pages.setsPerWeek.label, href: pages.setsPerWeek.path },
    ],
  },
  {
    title: "IronBuddy",
    links: [
      { label: "About IronBuddy", href: siteConfig.brandUrl },
      { label: "Nutrition Tracker", href: siteConfig.nutritionUrl },
    ],
  },
  {
    title: "Company",
    links: [
      { label: pages.about.label, href: pages.about.path },
      { label: pages.press.label, href: pages.press.path },
      { label: pages.contact.label, href: pages.contact.path },
      { label: pages.privacy.label, href: pages.privacy.path },
    ],
  },
] as const;
