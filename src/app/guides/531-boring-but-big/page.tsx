import type { Metadata } from "next";
import { BulletList, Callout, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { RunInIronBuddy, SplitDayTable, WeekLayouts } from "@/components/SplitGuide";
import type { SplitDay, WeekLayout } from "@/components/SplitGuide";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.fiveThreeOne);

/** Mirrors IronBuddy's "5/3/1 (BBB)" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Squat-pattern focus",
    focus: "Monday",
    exercises: [
      "Leg Press 3×10–12 (main)",
      "Leg Press 5×10, lighter (BBB volume)",
      "Dumbbell Romanian Deadlift 3×10–12",
      "Seated Leg Curl 2×12–15",
      "Cable Crunch 2×15",
    ],
  },
  {
    day: "Bench-pattern focus",
    focus: "Wednesday",
    exercises: [
      "Machine Chest Press 3×10–12 (main)",
      "Machine Chest Press 5×10, lighter (BBB volume)",
      "Chest-Supported Row 3×10–12",
      "Cable Triceps Pushdown 2×12–15",
    ],
  },
  {
    day: "Hinge / press focus",
    focus: "Friday",
    exercises: [
      "Dumbbell Romanian Deadlift 3×10 (main)",
      "Dumbbell Romanian Deadlift 5×10, lighter (BBB volume)",
      "Machine Shoulder Press 3×10–12",
      "Lat Pulldown 3×10–12",
      "Dumbbell Lateral Raise 2×12–15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "Monday, Wednesday, Friday",
    week: "Squat, rest, Bench, rest, Hinge / press, rest, rest",
    fits: "The layout the preset uses. A rest day after every session, which the 5×10 volume work needs.",
  },
  {
    name: "Two days a week",
    week: "Squat, rest, rest, Bench, rest, rest, rest, then Hinge / press, Squat, Bench the next weeks",
    fits: "The minimum. The three days rotate, so each main lift comes round every ten days or so.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-531-original",
    question: "How does this differ from Jim Wendler's 5/3/1?",
    answer:
      "The original is a four-day barbell programme: squat, bench, deadlift and overhead press, each with a training max (about 90% of your best), weekly waves of 5s, 3s and then a 5/3/1 week, a deload, and for Boring But Big, 5×10 of the same lift at 50–60% afterwards. IronBuddy's preset keeps one idea, a main lift followed by 5×10 of it, over three machine-and-dumbbell days with a plain 10–12 rep range and no percentages or waves. If you want to run real 5/3/1, build it as your own split; the structure is easy to enter.",
  },
  {
    id: "faq-531-bbb-weight",
    question: "How heavy should the 5×10 sets be?",
    answer:
      "Light enough that you finish all 50 reps with the same weight and clean form. In the original, 50–60% of the training max. In this version, start around half of what you used for the main sets and add a little when all five sets of ten feel easy. The volume is the point, not the load.",
  },
  {
    id: "faq-531-who",
    question: "Who is this version for?",
    answer:
      "Lifters who like the idea of one main lift per day with a big block of volume behind it, on three days a week, without the arithmetic of training maxes and waves. If you have a year of barbell experience and want the real thing, run the original; this preset is a gentler entry to the same structure.",
  },
];

export default function FiveThreeOneGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.fiveThreeOne);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.fiveThreeOne, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="5/3/1 Boring But Big: a simple three-day version"
        updated={pages.fiveThreeOne.modified}
        lead="5/3/1 Boring But Big is the best-known way to run Jim Wendler's 5/3/1: a main lift, then five sets of ten of the same lift at a lighter weight. IronBuddy's 5/3/1 (BBB) preset keeps that structure over three days a week and leaves out the training-max percentages and weekly waves. This guide explains what you get, what you don't, and how to track it."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Three days, each with one main lift: a squat pattern, a bench pattern, a hinge and press day.</li>
            <li>After the main sets, 5×10 of the same lift, lighter. That is the Boring But Big.</li>
            <li>This is a simplified adaptation: no training max, no 5/3/1 waves, no deload week.</li>
            <li>Track the main lift by weight and the 5×10 by whether you finish all fifty reps.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What 5/3/1 and Boring But Big are">
          <p>
            5/3/1 is a strength programme by Jim Wendler built around four lifts (squat, bench press,
            deadlift, overhead press), one per session, with the main work set from a percentage of a
            training max and a rep scheme that changes each week: sets of 5, then 3, then 5/3/1, then
            a deload. <Strong>Boring But Big</Strong> is the most popular assistance template for it:
            after the main sets, five sets of ten of the same lift at a much lighter weight. The name is
            honest. Fifty reps of squats is boring, and it builds muscle.
          </p>
          <p>
            IronBuddy&apos;s preset is an adaptation, not the programme. It keeps the shape of a day
            (main lift, then 5×10 of it, then a little assistance) and runs it three days a week on
            machines and dumbbells with a normal 10–12 rep range. There are no percentages, waves or
            deloads to calculate. The questions below spell out the differences.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            Each day has one main movement pattern. The main sets come first and heavier; the 5×10 of
            the same exercise follows at a lighter weight; two or three assistance exercises finish the
            day. Rest 2 minutes on the main and volume sets, a minute on the assistance.
          </p>
          <SplitDayTable days={days} caption="The three days of the 5/3/1 Boring But Big preset with the exercises, sets and reps of each" />
          <p>
            The preset uses a leg press for the squat pattern, a machine chest press for the bench
            pattern and a dumbbell Romanian deadlift for the hinge, so it works in any gym. If you have
            a barbell and the experience, swap in the squat, bench press and deadlift and keep
            everything else.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits">
          <BulletList>
            <li>
              <Strong>Lifters who want one big thing per day.</Strong> One main lift to get stronger on,
              one block of volume to grow from, then go home.
            </li>
            <li>
              <Strong>Three days a week.</Strong> The sessions are short on exercises but long on sets;
              the rest day after each one matters.
            </li>
            <li>
              <Strong>Not the original.</Strong> If you want 5/3/1 as written, with training maxes and
              waves, build it as your own split in IronBuddy and log the percentages as weights. If you
              want a plan that trains everything twice a week, an{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> or{" "}
              <TextLink href={pages.fullBody.path}>three-day full body plan</TextLink> is a better fit.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track it">
          <BulletList>
            <li>
              <Strong>Main lift: weight and 1RM.</Strong> The main sets are where strength shows. Watch
              the best-weight and estimated 1RM charts for the leg press, chest press and Romanian
              deadlift; those three lines are the programme.
            </li>
            <li>
              <Strong>5×10: all fifty reps, same weight.</Strong> The volume work is done when you
              finish every set of ten with the weight you started with. Log it as five sets; when all
              five are easy, add a little. If the fifth set collapses, the weight is too heavy, not your
              effort too low.
            </li>
            <li>
              <Strong>Same lift, two jobs.</Strong> The leg press appears twice on Monday. IronBuddy
              logs them as separate exercises on the day, and the summary compares each with its own
              previous session, so the main sets and the volume sets are tracked apart.
            </li>
            <li>
              <Strong>Volume per session.</Strong> Fifty volume reps plus the main sets make the
              session volume chart jump; that is expected. Compare Monday with Monday, not with
              Wednesday.
            </li>
          </BulletList>
          <p>
            For adding weight without guessing, read{" "}
            <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running 5/3/1 (BBB) in IronBuddy">
          <RunInIronBuddy
            preset="5/3/1 (BBB)"
            note="The 5×10 sets are listed as a second entry of the main exercise with a “BBB volume” note, so they are logged apart from the main sets."
          />
        </ContentSection>

        <ContentSection id="faq" title="5/3/1 Boring But Big questions">
          <FaqList items={faqs} />
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Choose loads and a weekly
            layout that suit your experience and recovery, and speak to a qualified professional if
            you have an injury or a health condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.fullBody, pages.upperLower, pages.progressiveOverload, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
