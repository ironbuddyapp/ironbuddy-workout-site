import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

/**
 * Facts for /workout-tracker-app-comparison/. Every statement about another app is something its own Google Play
 * page or official site said on `checkedOn`, never an opinion or a ranking. Store facts were read from the US
 * English Google Play pages. Re-check them, and bump `checkedOn` and the page's `modified` date, before changing
 * any of them. Leave a fact out rather than guess it.
 */
export const checkedOn = "2026-10-06";

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

type Source = { label: string; href: string };

export type ComparedApp = {
  id: string;
  name: string;
  developer: string;
  /** The app's Google Play page (IronBuddy's is the plain listing URL, without the site's tracking tag). */
  playUrl: string;
  /** The page on this site that covers the app in more depth. */
  page: string | null;
  /** Declared on its Google Play page. */
  play: {
    inAppPurchases: string;
    adsLabel: string;
    dataCollected: string;
    dataShared: string;
    lastUpdated: string;
  };
  /** What the app's own pages say about price, with the page each statement comes from. */
  pricing: { text: string; sources: Source[] };
};

export const comparedApps: ComparedApp[] = [
  {
    id: "ironbuddy",
    name: "IronBuddy",
    developer: "IronBuddy",
    playUrl: siteConfig.playStoreUrl,
    page: null,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "No data collected",
      dataShared: "No data shared",
      lastUpdated: "30 Sep 2026",
    },
    pricing: {
      text: `Free to download with a ${siteConfig.freeTrialDays}-day free trial. After the trial, a one-time purchase is required to keep logging and editing. No subscription.`,
      sources: [{ label: "IronBuddy on Google Play", href: siteConfig.playStoreUrl }],
    },
  },
  {
    id: "hevy",
    name: "Hevy",
    developer: "Hevy",
    playUrl: play("com.hevy"),
    page: pages.hevyAlternative.path,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "Personal info, photos and videos, and 4 others",
      dataShared: "No data shared",
      lastUpdated: "1 Oct 2026",
    },
    pricing: {
      text: "Hevy describes itself as a free workout tracker for iOS and Android. Google Play lists in-app purchases. Its Pro prices are not shown here.",
      sources: [
        { label: "hevyapp.com", href: "https://www.hevyapp.com/" },
        { label: "Hevy on Google Play", href: play("com.hevy") },
      ],
    },
  },
  {
    id: "strong",
    name: "Strong",
    developer: "Strong Fitness PTE. LTD.",
    playUrl: play("io.strongapp.strong"),
    page: pages.strongAlternative.path,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "Personal info, health and fitness, and 3 others",
      dataShared: "No data shared",
      lastUpdated: "30 Sep 2026",
    },
    pricing: {
      text: "Strong PRO is bought through in-app purchase on Google Play. Strong's help center says prices vary between regions and does not list them.",
      sources: [
        { label: "Strong help center", href: "https://help.strongapp.io/article/132-strong-pro" },
        { label: "Strong on Google Play", href: play("io.strongapp.strong") },
      ],
    },
  },
  {
    id: "fitnotes",
    name: "FitNotes",
    developer: "James Gay",
    playUrl: play("com.github.jamesgay.fitnotes"),
    page: pages.fitnotesAlternative.path,
    play: {
      inAppPurchases: "No",
      adsLabel: "None",
      dataCollected: "No data collected",
      dataShared: "No data shared",
      lastUpdated: "24 Oct 2025",
    },
    pricing: {
      text: "Free to install. Google Play lists no in-app purchases and shows no ads label.",
      sources: [{ label: "FitNotes on Google Play", href: play("com.github.jamesgay.fitnotes") }],
    },
  },
  {
    id: "jefit",
    name: "JEFIT",
    developer: "Jefit Inc.",
    playUrl: play("je.fit"),
    page: pages.jefitAlternative.path,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "Location, personal info, and 5 others",
      dataShared: "No data shared",
      lastUpdated: "30 Sep 2026",
    },
    pricing: {
      text: "A free plan, and a paid JEFIT Elite subscription, monthly or yearly.",
      sources: [{ label: "jefit.com/elite", href: "https://www.jefit.com/elite" }],
    },
  },
  {
    id: "boostcamp",
    name: "Boostcamp",
    developer: "BPM Health Co.",
    playUrl: play("com.bpmhealth.boostcamp"),
    page: pages.boostcampAlternative.path,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "No data collected",
      dataShared: "May share personal info",
      lastUpdated: "1 Oct 2026",
    },
    pricing: {
      text: "The app and its programs are free. Boostcamp Pro is a paid subscription, yearly or monthly, with a free trial.",
      sources: [{ label: "boostcamp.app/pro", href: "https://www.boostcamp.app/pro" }],
    },
  },
  {
    id: "caliber",
    name: "Caliber",
    developer: "Caliber Fitness",
    playUrl: play("com.caliberfitness.app"),
    page: pages.caliberAlternative.path,
    play: {
      inAppPurchases: "Yes",
      adsLabel: "None",
      dataCollected: "Personal info, health and fitness, and 5 others",
      dataShared: "No data shared",
      lastUpdated: "4 Sep 2026",
    },
    pricing: {
      text: "Caliber calls its workout app free and offers paid 1-on-1 coaching. The page does not show coaching prices.",
      sources: [{ label: "caliberstrong.com", href: "https://caliberstrong.com/workout-app/" }],
    },
  },
];
