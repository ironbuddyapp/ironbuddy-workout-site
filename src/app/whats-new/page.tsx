import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.whatsNew);

/** Newest first. Keep in step with the app's What's New notes (src/lib/whats-new.ts in the app). */
const releases: Array<{ version: string; date: string; title: string; notes: React.ReactNode[] }> = [
  {
    version: "2.0.9",
    date: "18 October 2026",
    title: "A new home for the privacy policy",
    notes: [
      <>Settings → Privacy Policy opens the policy at its new address, workout.ironbuddy.fit/privacy. The old address forwards there.</>,
    ],
  },
  {
    version: "2.0.8",
    date: "16 October 2026",
    title: "A level on every split",
    notes: [
      <>Every preset split shows its level: Beginner, Intermediate or Advanced. See the <TextLink href={pages.trainingSplits.path}>ten presets</TextLink>.</>,
      <>Presets are listed Advanced first, Beginner last, and Filters has a Level choice.</>,
      <>Edit week has a calendar icon, and Customise is a round dashboard button right of the page dots.</>,
      <>The arrow and the three-dot menu on split cards line up on the right.</>,
    ],
  },
  {
    version: "2.0.7",
    date: "15 October 2026",
    title: "Today's volume, right after logging",
    notes: [
      <>Once today&apos;s workout is logged, the Today block shows what you lifted today, not last session&apos;s total.</>,
    ],
  },
  {
    version: "2.0.6",
    date: "15 October 2026",
    title: "Home built around today, and your calendar look",
    notes: [
      <>Home opens on today: today&apos;s workout with one Log button. On a rest day it names your next workout.</>,
      <><TextLink href={pages.customizableHome.path}>Calendar look</TextLink>: five day styles (Ring, Boxes, Track, Effort, Agenda), five progress styles and your greeting.</>,
      <>Missed a day? Move that workout to the next free day in one tap.</>,
      <>Week and Month are always visible; tap the date to jump to any week.</>,
      <>A day&apos;s button names its date (&ldquo;Log for Fri 16 Oct&rdquo;), and Reset moved under ⋯.</>,
      <>Bodyweight exercises ask for reps, cardio for minutes; Add exercise has the library&apos;s filters.</>,
      <>Home cards are now called widgets.</>,
    ],
  },
  {
    version: "2.0.5",
    date: "14 October 2026",
    title: "Home fits your screen",
    notes: [
      <>Home pages never scroll: a widget that doesn&apos;t fit is refused, with the reason.</>,
      <>A hard swipe moves one page at a time.</>,
      <>Muscles worked shows just the body map; a tall Muscle Balance names the body areas.</>,
      <>Help is a slim tab on the right edge.</>,
    ],
  },
  {
    version: "2.0.4",
    date: "14 October 2026",
    title: "Security update",
    notes: [<>The app framework (Capacitor) updated to 8.4.3.</>],
  },
  {
    version: "2.0.3",
    date: "14 October 2026",
    title: "Customise Home, easier to use",
    notes: [
      <>Hold a card to lift it; a quick swipe scrolls the page or moves to the next page while customising.</>,
      <>A label under your finger says where a card lands and at what size; it only changes size once you rest over a spot.</>,
      <>Rest a card at the left or right edge to carry it to the next page.</>,
      <>Tap the corner handle for the list of sizes; bigger × and ↘ buttons and a wider page-dot strip.</>,
      <>Removing a card shows Undo for five seconds; Reset asks first.</>,
    ],
  },
  {
    version: "2.0.2",
    date: "13 October 2026",
    title: "Glutes in Muscles worked",
    notes: [
      <>Squats, deadlifts, Romanian deadlifts, lunges, leg press and back extensions now light up the glutes on Home. Leg extensions and curls don&apos;t.</>,
    ],
  },
  {
    version: "2.0.1",
    date: "13 October 2026",
    title: "Gold, and a simpler Muscles worked",
    notes: [
      <>A new accent colour, Gold: eight in total (full version).</>,
      <>Muscles worked shows every muscle you trained in the same colour, listed by name, without set counts; the sets stay in Muscle Balance.</>,
      <>Appearance confirms your choice with &ldquo;Saved&rdquo; and a Done button.</>,
      <>Fixed: swiping between the Home pages with a finger.</>,
    ],
  },
  {
    version: "2.0",
    date: "13 October 2026",
    title: "A new Home, Muscle Balance, charts, share cards",
    notes: [
      <>A new Home: three pages of cards that fit your screen, with <TextLink href={pages.muscleBalance.path}>Muscles worked and Muscle Balance</TextLink>.</>,
      <>Redesigned <TextLink href={pages.progressCharts.path}>progress charts</TextLink>: best weight, 1RM, weight vs reps, volume and reps, with full screen and time ranges.</>,
      <>A <TextLink href={pages.workoutSummary.path}>workout summary</TextLink>: every exercise against last time, with new records marked.</>,
      <>Exercise pages with your last workout, your records and the muscles they train.</>,
      <>Full version: <TextLink href={pages.customizableHome.path}>Customise Home</TextLink>, <TextLink href={pages.shareCards.path}>share cards</TextLink> and accent colours.</>,
      <>Search in Settings, filters for presets and the library, and every workout counts toward your week.</>,
    ],
  },
  {
    version: "1.0.19",
    date: "October 2026",
    title: "The 7-day free trial",
    notes: [
      <>A 7-day free trial with everything unlocked: the full library, every split, your own splits.</>,
      <>When the trial ends your workouts stay visible; unlock once to keep logging.</>,
      <>A reminder to turn on Google backup, and Settings reorganised into clear groups.</>,
    ],
  },
  {
    version: "1.0.18",
    date: "September 2026",
    title: "Presets rewritten",
    notes: [
      <>All ten preset splits rewritten, with the rep range and rest time on every exercise, and a &ldquo;Beginner-friendly&rdquo; label on five of them.</>,
      <>Push / Pull (2×) is now four days, 5/3/1 (BBB) a simplified three-day plan, and the Bro Split runs Monday to Friday.</>,
    ],
  },
  {
    version: "1.0.17",
    date: "September 2026",
    title: "Update notices",
    notes: [<>Get notified when a new version is out, then update in one tap.</>],
  },
  {
    version: "1.0.16",
    date: "September 2026",
    title: "Explanations and techniques",
    notes: [
      <>Tap ⓘ to see what volume and 1RM mean; −/+ buttons for drop sets and other techniques.</>,
      <>Tips can be turned off in Settings; a Rate IronBuddy card; a thank-you screen after you unlock.</>,
    ],
  },
];

export default function WhatsNewPage() {
  const crumbs = trail(pages.home, pages.whatsNew);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.whatsNew, { trail: crumbs, about: "app" })} />
      <PageHero
        trail={crumbs}
        eyebrow="What's new"
        title="What's new in IronBuddy"
        updated={pages.whatsNew.modified}
        lead="Every IronBuddy release, newest first, in the words the app shows after an update. Updates come through Google Play; the app tells you when one is out."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        {releases.map((release) => (
          <ContentSection key={release.version} id={`v${release.version.replace(/\./g, "-")}`} title={`${release.version}: ${release.title}`}>
            <p className="text-sm text-muted">{release.date}</p>
            <BulletList>
              {release.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </BulletList>
          </ContentSection>
        ))}

        <CtaBanner />

        <RelatedLinks items={[pages.features, pages.customizableHome, pages.faq, pages.press]} />
      </PageBody>
    </main>
  );
}
