import { siteConfig } from "@/lib/site";

export type PageKind =
  | "home"
  | "product"
  | "faq"
  | "about"
  | "guides"
  | "guide"
  | "contact"
  | "press"
  | "legal";

export type PageDef = {
  /** Path with leading and trailing slash (the site uses trailingSlash: true). */
  path: string;
  kind: PageKind;
  /** Short label for navigation, footer and related-link cards. */
  label: string;
  /** Title without the " | IronBuddy" suffix (the root layout template adds it). The home page is the exception. */
  title: string;
  /** 140–160 characters. */
  description: string;
  /** One line used on related-link cards and in llms.txt. */
  summary: string;
  /** ISO dates. Bump `modified` whenever the page content changes; the sitemap and JSON-LD read it. */
  published: string;
  modified: string;
  /**
   * The search this page targets, from keyword-map.md (owner-approved). `main` must appear in the title, H1, meta
   * description and first paragraph, and no two pages share it (seo:check). `null`: a navigational page with no target.
   */
  keywords: { main: string; supporting: readonly string[] } | null;
  /** Extra image paths to list in the sitemap for image discovery. */
  images?: readonly string[];
};

/** IronBuddy 2.0.3: one page per feature, What's new, the easier Customise Home. */
const RELEASE_203 = "2026-10-14";
/** 2.0.8: preset levels, the dashboard button, Edit week icon. Set to the day it goes live. */
const RELEASE_208 = "2026-10-16";
const SPLIT_GUIDES = "2026-10-14";
const TRAINING_GUIDES = "2026-10-14";
const LAUNCH = "2026-09-17";
const UPDATED = "2026-09-20";
const CONTACT_ADDED = "2026-09-21";
const PPL_ADDED = "2026-09-28";
const ALTERNATIVES_SPLIT = "2026-09-28";
const MORE_ALTERNATIVES = "2026-09-28";
const PRESS_ADDED = "2026-09-30";
const COMPARISON_ADDED = "2026-10-06";

/** The current screenshot set (appScreenshots in content.ts). */
const screenshotImages = [
  "/screenshots/ironbuddy-workout-tracker-home.webp",
  "/screenshots/ironbuddy-workout-log.webp",
  "/screenshots/ironbuddy-training-splits.webp",
  "/screenshots/ironbuddy-training-volume.webp",
  "/screenshots/ironbuddy-estimated-1rm-chart.webp",
  "/screenshots/ironbuddy-body-weight-tracker.webp",
  "/screenshots/ironbuddy-exercise-library.webp",
  "/screenshots/ironbuddy-muscle-balance.webp",
  "/screenshots/ironbuddy-workout-summary.webp",
  "/screenshots/ironbuddy-share-card.webp",
  "/screenshots/ironbuddy-exercise-page.webp",
  "/screenshots/ironbuddy-customizable-home.webp",
  "/screenshots/ironbuddy-accent-colors.webp",
  "/screenshots/ironbuddy-offline-data.webp",
  "/screenshots/ironbuddy-set-techniques.webp",
  "/screenshots/ironbuddy-exercise-filters.webp",
  "/screenshots/ironbuddy-split-presets.webp",
  "/screenshots/ironbuddy-share-chart.webp",
  "/screenshots/ironbuddy-muscle-balance-explained.webp",
  "/screenshots/ironbuddy-personal-records.webp",
  "/screenshots/ironbuddy-customise-sizes.webp",
] as const;

/** Keyword map applied: titles, H1s, descriptions and intros name each page's main keyword. */
const KEYWORD_MAP = "2026-10-21";

export const pages = {
  home: {
    path: "/",
    kind: "home",
    label: "Home",
    title: siteConfig.title,
    description: siteConfig.description,
    summary: "Offline Android workout tracker with no account, ads, or subscription.",
    keywords: { main: "workout tracker app", supporting: ["gym log app", "IronBuddy: Workout Tracker"] },
    published: LAUNCH,
    modified: KEYWORD_MAP,
    images: screenshotImages,
  },
  features: {
    path: "/features/",
    kind: "product",
    label: "Features",
    title: "Gym Log App Features: Splits, Charts & Home",
    description:
      "IronBuddy's gym log app features: an offline log for sets, reps and weight, ten splits, Muscle Balance, progress charts, share cards and a custom Home.",
    summary: "Workout logging, training splits, Muscle Balance, progress charts, share cards, the exercise library and a customizable Home.",
    keywords: { main: "gym log app", supporting: ["workout log", "training splits", "progress charts"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
    images: screenshotImages,
  },
  customizableHome: {
    path: "/features/customizable-home/",
    kind: "product",
    label: "Customizable Home",
    title: "Workout Calendar App With a Customizable Home",
    description:
      "A workout calendar app with a Home you arrange: pick your calendar look, then drag, resize, add and remove widgets for charts, records and Muscle Balance.",
    summary: "Pick your calendar look, and drag, resize, add and remove the widgets on IronBuddy's Home, on three pages that fit your screen.",
    keywords: { main: "workout calendar app", supporting: ["customizable workout tracker", "widget"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-customizable-home.webp", "/screenshots/ironbuddy-calendar-look.webp", "/screenshots/ironbuddy-customise-sizes.webp"],
  },
  muscleBalance: {
    path: "/features/muscle-balance/",
    kind: "product",
    label: "Muscle Balance",
    title: "Muscle Group Tracker: Weekly Sets per Muscle",
    description:
      "IronBuddy's muscle group tracker shows your working sets per body area this week against last week, the areas you skipped, and every muscle on a body map.",
    summary: "Working sets per body area this week against last week, what you skipped, and the muscles you trained on a body map.",
    keywords: { main: "muscle group tracker", supporting: ["sets per muscle group", "weekly volume"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-muscle-balance.webp", "/screenshots/ironbuddy-muscle-balance-explained.webp"],
  },
  workoutSummary: {
    path: "/features/workout-summary/",
    kind: "product",
    label: "Workout summary",
    title: "Workout Summary: Compare With Last Time",
    description:
      "IronBuddy's workout summary shows each exercise against your last session (+2.5 kg, +2 reps), marks new personal records and sums the sets per muscle.",
    summary: "Every exercise against your last session, new records marked, the muscles worked and volume per muscle.",
    keywords: { main: "workout summary", supporting: ["compare with last time", "volume"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-workout-summary.webp"],
  },
  progressCharts: {
    path: "/features/progress-charts/",
    kind: "product",
    label: "Progress charts",
    title: "Progressive Overload Tracker: 1RM and Volume",
    description:
      "A progressive overload tracker with charts for every exercise: best weight, estimated 1RM, weight vs reps, volume and reps, plus body weight. Offline, Android.",
    summary: "Best weight, estimated 1RM, weight vs reps, volume and reps per exercise, workout volume, body weight and body fat.",
    keywords: { main: "progressive overload tracker", supporting: ["estimated 1RM", "volume chart"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-estimated-1rm-chart.webp", "/screenshots/ironbuddy-training-volume.webp", "/screenshots/ironbuddy-personal-records.webp"],
  },
  shareCards: {
    path: "/features/share-cards/",
    kind: "product",
    label: "Share cards",
    title: "Share Workout on Instagram: PRs, Charts, Cards",
    description:
      "Share workout on Instagram as an image: IronBuddy turns a workout, a personal record or a progress chart into a picture made on your phone. Nothing is uploaded.",
    summary: "A workout, a personal record or a chart as an image, made on your phone and shared or saved (full version).",
    keywords: { main: "share workout on Instagram", supporting: ["share cards", "personal record card"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-share-card.webp", "/screenshots/ironbuddy-share-chart.webp"],
  },
  exerciseLibrary: {
    path: "/features/exercise-library/",
    kind: "product",
    label: "Exercise library",
    title: "Exercise Library App: 800+ Exercises, Offline",
    description:
      "An exercise library app with 800+ exercises that works offline: filter by muscle and equipment, sort by recent, and open any one for its demo and your records.",
    summary: "800+ exercises with form demos, muscle and equipment filters, and an exercise page with your last workout and records.",
    keywords: { main: "exercise library app", supporting: ["800+ exercises", "exercise database"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-exercise-library.webp", "/screenshots/ironbuddy-exercise-filters.webp", "/screenshots/ironbuddy-exercise-page.webp"],
  },
  trainingSplits: {
    path: "/features/training-splits/",
    kind: "product",
    label: "Training splits",
    title: "Workout Split App: 10 Presets or Your Own Plan",
    description:
      "A workout split app with Push/Pull/Legs, Upper/Lower, Full Body, PHUL, PHAT, 5/3/1 and more: filter by days and level, or build your own split.",
    summary: "Ten preset splits with rep ranges and rest times, filters by days a week and level, and your own custom splits.",
    keywords: { main: "workout split app", supporting: ["training splits", "presets"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-training-splits.webp", "/screenshots/ironbuddy-split-presets.webp"],
  },
  setTechniques: {
    path: "/features/set-techniques/",
    kind: "product",
    label: "Set techniques",
    title: "How to Log Drop Sets, Supersets & Rest-Pause",
    description:
      "How to log drop sets, supersets, rest-pause, pyramid, back-off, myo-rep and cluster sets in IronBuddy, each with its own reps and weight, counted in volume.",
    summary: "Eight set techniques logged with their own reps and weight, so every drop and every pause counts in your volume.",
    keywords: { main: "how to log drop sets", supporting: ["supersets", "rest-pause"] },
    published: RELEASE_203,
    modified: KEYWORD_MAP,
    images: ["/screenshots/ironbuddy-set-techniques.webp", "/screenshots/ironbuddy-workout-log.webp"],
  },
  whatsNew: {
    path: "/whats-new/",
    kind: "product",
    label: "What's new",
    title: "What's New in IronBuddy: Release Notes",
    description:
      "Every IronBuddy update, newest first: Home built around today and Calendar look in 2.0.6, the new Home and Muscle Balance in 2.0, and each release in between.",
    summary: "Release notes for every IronBuddy version, newest first.",
    keywords: null,
    published: RELEASE_203,
    modified: KEYWORD_MAP,
  },
  offline: {
    path: "/offline-workout-tracker/",
    kind: "product",
    label: "Offline workout app",
    title: "Offline Workout Tracker & Gym Log for Android",
    description:
      "IronBuddy is an offline workout tracker for Android. Log sets and reps with no signal, Wi-Fi or account, and keep your training data on your phone. No ads.",
    summary: "What works without a signal, what needs the internet, and how to keep an offline log safe.",
    keywords: { main: "offline workout tracker", supporting: ["offline gym log", "without internet"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  noSubscription: {
    path: "/workout-app-no-subscription/",
    kind: "product",
    label: "No subscription, no ads",
    title: "Workout App With No Subscription and No Ads",
    description:
      `IronBuddy is a workout app with no subscription and no ads. Try it free for ${siteConfig.freeTrialDays} days, then a one-time purchase keeps it all unlocked. Offline, no account.`,
    summary: "How the free trial and one-time purchase work, and how to check any workout app for ads and subscriptions.",
    keywords: { main: "workout app with no subscription", supporting: ["one-time purchase", "7-day free trial"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  privacyFocused: {
    path: "/privacy-focused-fitness-app/",
    kind: "product",
    label: "Privacy-focused fitness app",
    title: "Privacy-Focused Fitness App With Local Data",
    description:
      "IronBuddy is a privacy-focused fitness app: no account, no ads, no third-party analytics SDKs and no cloud sync. Your workout data is stored on your device.",
    summary: "What IronBuddy stores, where copies can exist, which permissions it uses, and how to delete your data.",
    keywords: { main: "privacy-focused fitness app", supporting: ["no account", "local data"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  alternatives: {
    path: "/alternatives/",
    kind: "product",
    label: "Workout app alternatives",
    title: "Workout App Alternatives: Strong, Hevy, FitNotes",
    description:
      "Workout app alternatives to Strong, Hevy, FitNotes and JEFIT: IronBuddy is an Android workout tracker with offline use, no account, no ads and no subscription.",
    summary: "Who IronBuddy fits, who it does not, and a checklist for comparing any workout tracker.",
    keywords: { main: "workout app alternatives", supporting: ["Strong alternative", "Hevy alternative"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  // One page per app people search an alternative to. Like the hub above, they state facts about IronBuddy only,
  // never about the named app (see src/lib/alternatives.tsx).
  strongAlternative: {
    path: "/alternatives/strong/",
    kind: "product",
    label: "Strong alternative",
    title: "Strong App Alternative: Offline 1RM & PR Tracker",
    description:
      "Looking for a Strong app alternative on Android? IronBuddy tracks your 1RM, volume and PRs offline, with no account, no ads and no subscription.",
    summary: "IronBuddy for lifters coming from Strong: strength tracking, switching steps, and how to compare.",
    keywords: { main: "Strong app alternative", supporting: ["offline", "1RM"] },
    published: ALTERNATIVES_SPLIT,
    modified: KEYWORD_MAP,
  },
  hevyAlternative: {
    path: "/alternatives/hevy/",
    kind: "product",
    label: "Hevy alternative",
    title: "Hevy App Alternative: Offline Split Planner",
    description:
      "Looking for a Hevy app alternative? IronBuddy plans your week with 10 built-in splits or your own and works offline on Android. No account, ads or subscription.",
    summary: "IronBuddy for lifters coming from Hevy: planning splits, switching steps, and how to compare.",
    keywords: { main: "Hevy app alternative", supporting: ["offline", "split"] },
    published: ALTERNATIVES_SPLIT,
    modified: KEYWORD_MAP,
  },
  fitnotesAlternative: {
    path: "/alternatives/fitnotes/",
    kind: "product",
    label: "FitNotes alternative",
    title: "FitNotes Alternative: Gym Log With Auto Backups",
    description:
      "Looking for a FitNotes alternative? IronBuddy is an offline Android gym log that keeps an automatic backup file on your phone. No account, ads or subscription.",
    summary: "IronBuddy for lifters coming from FitNotes: backups and exports, switching steps, and how to compare.",
    keywords: { main: "FitNotes alternative", supporting: ["backup", "gym log"] },
    published: ALTERNATIVES_SPLIT,
    modified: KEYWORD_MAP,
  },
  jefitAlternative: {
    path: "/alternatives/jefit/",
    kind: "product",
    label: "JEFIT alternative",
    title: "JEFIT Alternative: Offline 800+ Exercise Library",
    description:
      "Looking for a JEFIT alternative? IronBuddy has an offline library of 800+ exercises with demos and filters, on Android, with no account, ads or subscription.",
    summary: "IronBuddy for lifters coming from JEFIT: the exercise library, switching steps, and how to compare.",
    keywords: { main: "JEFIT alternative", supporting: ["exercise library", "offline"] },
    published: ALTERNATIVES_SPLIT,
    modified: KEYWORD_MAP,
  },
  boostcampAlternative: {
    path: "/alternatives/boostcamp/",
    kind: "product",
    label: "Boostcamp alternative",
    title: "Boostcamp Alternative: Offline Set-by-Set Log",
    description:
      "Looking for a Boostcamp alternative? IronBuddy logs every set offline, with drop sets, supersets and notes, on Android. No account, no ads, no subscription.",
    summary: "IronBuddy for lifters coming from Boostcamp: set-by-set logging, switching steps, and how to compare.",
    keywords: { main: "Boostcamp alternative", supporting: ["program", "offline"] },
    published: MORE_ALTERNATIVES,
    modified: KEYWORD_MAP,
  },
  caliberAlternative: {
    path: "/alternatives/caliber/",
    kind: "product",
    label: "Caliber alternative",
    title: "Caliber App Alternative: Lifts & Body Weight",
    description:
      "Looking for a Caliber app alternative? IronBuddy tracks your lifts, body weight and body fat % offline on Android, with no account, no ads and no subscription.",
    summary: "IronBuddy for lifters coming from Caliber: body weight and body fat tracking, switching steps, and how to compare.",
    keywords: { main: "Caliber app alternative", supporting: ["body weight", "offline"] },
    published: MORE_ALTERNATIVES,
    modified: KEYWORD_MAP,
  },
  comparison: {
    path: "/workout-tracker-app-comparison/",
    kind: "product",
    label: "App comparison",
    title: "Workout App Comparison: 7 Android Trackers",
    description:
      "A workout app comparison of seven Android trackers: ads label, in-app purchases, declared data collection and pricing, from Google Play and official pages.",
    summary: "IronBuddy and six popular Android workout trackers compared on Google Play facts and published prices, with sources and dates.",
    keywords: { main: "workout app comparison", supporting: ["android", "compared"] },
    published: COMPARISON_ADDED,
    modified: KEYWORD_MAP,
  },
  faq: {
    path: "/faq/",
    kind: "faq",
    label: "FAQ",
    title: "FAQ: Offline Use, Pricing, Ads & Privacy",
    description:
      "Answers about IronBuddy: does it work offline, need a subscription, show ads, require an account, or store data on your phone? Plus progressive overload.",
    summary: "Answers about offline use, pricing, ads, accounts, data storage and progress tracking.",
    keywords: null,
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  about: {
    path: "/about/",
    kind: "about",
    label: "About",
    title: "About Us: An Offline Android Gym Log App",
    description:
      "IronBuddy is an Android workout tracker built on one idea: your training data belongs to you. See how it works, what it costs, and how to get in touch.",
    summary: "What IronBuddy is, how it is priced, how it handles data, and how to contact us.",
    keywords: null,
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  press: {
    path: "/press/",
    kind: "press",
    label: "Press kit",
    title: "Press Kit: App Icon, Screenshots & Fact Sheet",
    description:
      "Download the IronBuddy press kit: a fact sheet, ready-to-use descriptions, the app icon and screenshots of the offline workout tracker for Android.",
    summary: "Fact sheet, ready-to-use descriptions, the app icon and screenshots for writing about IronBuddy.",
    keywords: null,
    published: PRESS_ADDED,
    modified: KEYWORD_MAP,
    images: ["/press/ironbuddy-app-icon-1024.png"],
  },
  guides: {
    path: "/guides/",
    kind: "guides",
    label: "Guides",
    title: "Workout Tracking Guides: Overload, Logs, Splits",
    description:
      "Workout tracking guides for lifters who log their training: progressive overload, what to record in a gym log, and how to run PPL, Upper Lower, PHUL and PHAT.",
    summary: "Plain-language guides to progressive overload, workout logging and training splits.",
    keywords: { main: "workout tracking guides", supporting: ["progressive overload", "workout split"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  progressiveOverload: {
    path: "/guides/how-to-track-progressive-overload/",
    kind: "guide",
    label: "How to track progressive overload",
    title: "How to Track Progressive Overload (Simple Guide)",
    description:
      "Learn how to track progressive overload with sets, reps, weight and 1RM. Includes a double progression example and a simple weekly review routine.",
    summary: "A simple method for tracking progressive overload with sets, reps, weight, volume and 1RM.",
    keywords: { main: "how to track progressive overload", supporting: ["progressive overload log"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  logWorkouts: {
    path: "/guides/how-to-log-workouts/",
    kind: "guide",
    label: "How to log your workouts",
    title: "How to Log Workouts: What to Track and Why",
    description:
      "How to log workouts at the gym: the few numbers worth recording, how to stay consistent, and how to review your log so your training keeps improving.",
    summary: "The numbers worth recording in a gym log, and how to keep the habit going.",
    keywords: { main: "how to log workouts", supporting: ["best way to log workouts", "workout log"] },
    published: UPDATED,
    modified: KEYWORD_MAP,
  },
  pushPullLegs: {
    path: "/guides/push-pull-legs-split/",
    kind: "guide",
    label: "Push Pull Legs split",
    title: "Push Pull Legs Split: How to Plan and Track It",
    description:
      "How to run a Push Pull Legs split: 3-day and 6-day weekly layouts, which lifts go on each day, and how to log and progress a PPL workout routine.",
    summary: "Three-day and six-day Push Pull Legs layouts, what goes on each day, and how to track a PPL split.",
    keywords: { main: "push pull legs split", supporting: ["PPL", "6-day"] },
    published: PPL_ADDED,
    modified: PPL_ADDED,
  },
  upperLower: {
    path: "/guides/upper-lower-split/",
    kind: "guide",
    label: "Upper Lower split",
    title: "Upper Lower Split: 4-Day Workout Plan & Tracking",
    description:
      "How to run a four-day Upper Lower split: two upper and two lower sessions a week, the exercises on each day, how to lay out the week, and how to track it.",
    summary: "Two upper and two lower sessions a week: what goes on each day, weekly layouts, and how to track an Upper Lower split.",
    keywords: { main: "upper lower split", supporting: ["4-day", "upper/lower"] },
    published: SPLIT_GUIDES,
    modified: RELEASE_208,
  },
  fullBody: {
    path: "/guides/full-body-workout-3-days/",
    kind: "guide",
    label: "Full body workout, 3 days a week",
    title: "Full Body Workout 3 Days a Week: Plan & Track It",
    description:
      "A full body workout 3 days a week: three sessions that each train the whole body, the exercises on each, why it suits beginners, and how to track progress.",
    summary: "Three full-body sessions a week: the exercises on each day, why it suits beginners, and how to track it.",
    keywords: { main: "full body workout 3 days a week", supporting: ["full body", "beginner"] },
    published: SPLIT_GUIDES,
    modified: KEYWORD_MAP,
  },
  phul: {
    path: "/guides/phul-workout/",
    kind: "guide",
    label: "PHUL split",
    title: "PHUL Workout Split: 4 Days, Power + Hypertrophy",
    description:
      "The PHUL workout explained: a four-day upper/lower split with two power and two hypertrophy days, the exercises on each day, who it suits, and how to track it.",
    summary: "The four-day Power Hypertrophy Upper Lower split: what each day trains, who it suits, and how to run and track it.",
    keywords: { main: "PHUL workout", supporting: ["PHUL program", "PHUL 4 day split", "PHUL progression"] },
    published: SPLIT_GUIDES,
    modified: KEYWORD_MAP,
  },
  phat: {
    path: "/guides/phat-workout/",
    kind: "guide",
    label: "PHAT split",
    title: "PHAT Workout Split: 5 Days, Power + Hypertrophy",
    description:
      "The PHAT workout explained: Layne Norton's five-day Power Hypertrophy Adaptive Training split, what each day trains, who it suits, and how to log it.",
    summary: "The five-day Power Hypertrophy Adaptive Training split: what each day trains, who it suits, and how to track it.",
    keywords: { main: "PHAT workout", supporting: ["Layne Norton", "PHAT routine"] },
    published: SPLIT_GUIDES,
    modified: KEYWORD_MAP,
  },
  broSplit: {
    path: "/guides/bro-split/",
    kind: "guide",
    label: "Bro split",
    title: "Bro Split: 5-Day Body Part Workout Routine",
    description:
      "The bro split explained: one body part a day, Monday to Friday. What each day trains, who it suits, its trade-offs, and how to log and progress it.",
    summary: "One body part a day, Monday to Friday: what each day trains, the trade-offs, and how to track a bro split.",
    keywords: { main: "bro split", supporting: ["bro split workout", "5-day bro split"] },
    published: SPLIT_GUIDES,
    modified: SPLIT_GUIDES,
  },
  arnoldSplit: {
    path: "/guides/arnold-split/",
    kind: "guide",
    label: "Arnold split",
    title: "Arnold Split: 6-Day Workout Plan and Tracking",
    description:
      "The Arnold split explained: chest and back, shoulders and arms, then legs, each twice a week. The exercises on each day, who it suits, and how to track it.",
    summary: "Chest and back, shoulders and arms, legs, each twice a week: what goes on each day and how to track the Arnold split.",
    keywords: { main: "Arnold split", supporting: ["Arnold split workout", "what is the Arnold split"] },
    published: SPLIT_GUIDES,
    modified: SPLIT_GUIDES,
  },
  fiveThreeOne: {
    path: "/guides/531-boring-but-big/",
    kind: "guide",
    label: "5/3/1 Boring But Big",
    title: "5/3/1 Boring But Big: A Simple 3-Day Version",
    description:
      "A simplified 5/3/1 Boring But Big: three days a week, a main lift then 5×10 of the same lift. How it differs from the original, and how to run and track it.",
    summary: "A three-day take on 5/3/1 Boring But Big: a main lift then 5×10 of it, how it differs from the original, and how to track it.",
    keywords: { main: "5/3/1 Boring But Big", supporting: ["BBB", "3-day"] },
    published: SPLIT_GUIDES,
    modified: KEYWORD_MAP,
  },
  setsPerWeek: {
    path: "/guides/sets-per-muscle-group-per-week/",
    kind: "guide",
    label: "Sets per muscle group per week",
    title: "How Many Sets per Muscle Group per Week?",
    description:
      "How many sets per muscle group per week you need: what counts as a set, what the research suggests, how to spread sets over the week, and how to check your log.",
    summary: "What the research suggests for weekly sets per muscle, what counts as a set, and how to check your own week.",
    keywords: { main: "how many sets per muscle group per week", supporting: ["sets per body part"] },
    published: TRAINING_GUIDES,
    modified: KEYWORD_MAP,
  },
  logTechniques: {
    path: "/guides/drop-sets-supersets-rest-pause/",
    kind: "guide",
    label: "Drop sets, supersets and rest-pause",
    title: "Rest-Pause Sets, Drop Sets & Supersets Explained",
    description:
      "What drop sets, supersets and rest-pause sets are, how to do each one, when they help and when they get in the way, and how to log them so your volume is right.",
    summary: "How to do drop sets, supersets and rest-pause sets, when to use them, and how to log them properly.",
    keywords: { main: "rest-pause sets", supporting: ["drop sets", "supersets"] },
    published: TRAINING_GUIDES,
    modified: KEYWORD_MAP,
  },
  oneRmChart: {
    path: "/guides/how-to-read-your-1rm-chart/",
    kind: "guide",
    label: "Reading your 1RM chart",
    title: "Estimated 1RM Chart: Reading Your One-Rep Max",
    description:
      "How to read an estimated 1RM chart: what a one-rep max estimate is, how the Epley formula works, why the chart moves, and how to pick your next weight from it.",
    summary: "What an estimated 1RM is, how the Epley formula works, how to read the trend, and when the number misleads.",
    keywords: { main: "estimated 1RM chart", supporting: ["one-rep max chart"] },
    published: TRAINING_GUIDES,
    modified: KEYWORD_MAP,
  },
  contact: {
    path: "/contact/",
    kind: "contact",
    label: "Contact",
    title: "Contact Us: App Support & Privacy Questions",
    description:
      "Get in touch with IronBuddy for app support, feedback or privacy questions. Find our email address and what to include so we can help you faster.",
    summary: "How to reach IronBuddy for support, feedback or privacy questions, and what to include.",
    keywords: null,
    published: CONTACT_ADDED,
    modified: KEYWORD_MAP,
  },
  privacy: {
    path: "/privacy/",
    kind: "legal",
    label: "Privacy Policy",
    title: "Privacy Policy: Local Data, No Account, No Ads",
    description:
      "IronBuddy's privacy policy: your workout data stays on your device. No account, no ads, no analytics SDKs; one-time purchase via Google Play or the App Store.",
    summary: "How IronBuddy handles data, backups, permissions and purchases.",
    keywords: null,
    published: LAUNCH,
    // The app policy text matches the policy repo (last updated 11 October 2026). This page is a day newer because
    // it adds the website-only GoatCounter note, which is not part of the app policy. Moved to workout.ironbuddy.fit
    // on 18 October 2026.
    modified: KEYWORD_MAP,
  },
} as const satisfies Record<string, PageDef>;

export type PageKey = keyof typeof pages;

export const pageList: PageDef[] = Object.values(pages);
