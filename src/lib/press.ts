import fs from "node:fs";
import path from "node:path";
import { appScreenshots } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";
import { appFeatureList } from "@/lib/structured-data";

/**
 * Press kit content, shared by the /press/ page and the ZIP download so the two never disagree. Server-only: it
 * reads the files in public/press at build time for their dimensions and sizes. Every claim here must match the
 * app, like the rest of the site.
 */

/** The day IronBuddy went public on Google Play. */
export const releaseDate = "2026-09-30";
/** When the screenshots were taken (app 2.0). */
export const screenshotsDate = "2026-10-13";

export const pressZipPath = "/press/ironbuddy-press-kit.zip";

/** Shown under the kit's title on the page and in the ZIP's README. */
export const pressUsage =
  "You are welcome to use the descriptions, the app icon and the screenshots in articles, reviews, videos and listings about IronBuddy.";

type PressFile = {
  /** Path under public/, as linked from the page. */
  src: string;
  /** Path inside the ZIP, under the ironbuddy-press-kit/ folder. */
  zipPath: string;
  label: string;
  width: number;
  height: number;
  bytes: number;
};

function pressFile(src: string, zipPath: string, label: string): PressFile {
  const data = fs.readFileSync(path.join(process.cwd(), "public", src));
  // A PNG starts with an 8-byte signature and the IHDR chunk: length, type, then width and height.
  return { src, zipPath, label, width: data.readUInt32BE(16), height: data.readUInt32BE(20), bytes: data.length };
}

export const pressIcon = {
  ...pressFile("/press/ironbuddy-app-icon-1024.png", "app-icon/ironbuddy-app-icon-1024.png", "App icon"),
  /** A small copy for display on the page, so visitors do not load the full-size file just to see it. */
  preview: { src: "/press/ironbuddy-app-icon-preview.webp", width: 320, height: 320 },
};

/** The same screens as the website, as PNG files at a larger size. */
export const pressScreenshots = appScreenshots.map((shot) => {
  const file = shot.file.replace(/\.webp$/, ".png");
  return {
    ...pressFile(`/press/screenshots/${file}`, `screenshots/${file}`, shot.label),
    id: shot.id,
    alt: shot.alt,
    preview: { src: `/screenshots/${shot.file}`, width: shot.width, height: shot.height },
  };
});

export const pressFiles: PressFile[] = [pressIcon, ...pressScreenshots];

export const pressDescriptions = [
  {
    id: "one-sentence",
    title: "One sentence",
    text: "IronBuddy is an offline workout tracker and gym log for Android, with no account, no ads and no subscription.",
  },
  {
    id: "short",
    title: "Short",
    text: "IronBuddy is an offline workout tracker and gym log app for Android. Lifters use it to plan training splits, log sets, reps and weight, and track progressive overload with charts of training volume and 1RM (one-rep max), calculated with the Epley formula. It needs no account, shows no ads, and keeps workout data on the phone.",
  },
  {
    id: "long",
    title: "Long",
    text: `IronBuddy is an offline workout tracker and gym log for Android, built for lifters who want to own their training data. It comes with 10 split templates, including Push Pull Legs, Upper Lower and Full Body, and logs every set with reps, weight, notes and techniques such as drop sets and supersets. Charts show training volume and 1RM for each exercise, alongside body weight and body fat percentage, and an exercise library of more than 800 exercises includes demonstrations. IronBuddy works without an internet connection, needs no account and has no ads. It is free to download with a ${siteConfig.freeTrialDays}-day free trial; after that, a one-time purchase of ${siteConfig.price.label} unlocks the full app. There is no subscription.`,
  },
] as const;

export const pressFeatures = appFeatureList;

type Fact = { term: string; detail: string; href?: string };

export const pressFacts: Fact[] = [
  { term: "Name", detail: siteConfig.fullName },
  { term: "Developer", detail: siteConfig.name },
  { term: "What it is", detail: "An offline workout tracker and gym log app" },
  { term: "Platform", detail: "Android, on Google Play. Not available on iPhone yet." },
  { term: "Released", detail: formatDate(releaseDate) },
  {
    term: "Price",
    detail: `Free to download with a ${siteConfig.freeTrialDays}-day free trial. After the trial, a one-time in-app purchase of ${siteConfig.price.label} is required to keep logging and editing. No subscription. Google Play shows the price in local currency.`,
  },
  { term: "Ads and account", detail: "No ads, no account and no sign-in" },
  { term: "Data", detail: "Stored on the phone and not sent to IronBuddy servers" },
  { term: "Category", detail: "Health & Fitness" },
  { term: "Language", detail: "English" },
  { term: "Android package", detail: siteConfig.playStoreId },
  { term: "Website", detail: siteConfig.url, href: "/" },
  // The plain listing URL, not the site's tagged one: writers copy it into their own articles.
  { term: "Google Play", detail: siteConfig.playStoreUrl, href: siteConfig.playStoreUrl },
  { term: "Press contact", detail: `${siteConfig.url}${pages.contact.path}`, href: pages.contact.path },
];

export const brandColors = [
  { name: "Lime", hex: "#B7FF2A" },
  { name: "Navy", hex: "#050B14" },
] as const;

export const brandNotes = [
  "Write the name as IronBuddy: one word, with a capital I and a capital B.",
  "Use the app icon as supplied. Please do not recolour, stretch or crop it, or add effects.",
  `The screenshots show the app as it was on ${formatDate(screenshotsDate)}.`,
] as const;

export function formatBytes(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export const wordCount = (text: string) => text.trim().split(/\s+/).length;

/** Plain-text copy of the kit for the ZIP, so it is useful without the website. */
export function pressReadme() {
  const lines = [
    `${siteConfig.fullName} press kit`,
    "",
    pressUsage,
    `The latest version of this kit is at ${siteConfig.url}${pages.press.path}`,
    "",
    "FACT SHEET",
    "",
    ...pressFacts.map((fact) => `${fact.term}: ${fact.detail}`),
    "",
    "DESCRIPTIONS",
    "",
    ...pressDescriptions.flatMap((item) => [`${item.title} (${wordCount(item.text)} words):`, item.text, ""]),
    "KEY FEATURES",
    "",
    ...pressFeatures.map((feature) => `- ${feature}`),
    "",
    "BRAND",
    "",
    ...brandNotes.map((note) => `- ${note}`),
    `- Colours: ${brandColors.map((color) => `${color.name} ${color.hex}`).join(", ")}`,
    "",
    "FILES",
    "",
    ...pressFiles.map((file) => `${file.zipPath}  (${file.label}, ${file.width} x ${file.height} PNG)`),
    "",
  ];
  return lines.join("\r\n");
}
