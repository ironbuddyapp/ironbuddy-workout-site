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

export const metadata: Metadata = pageMetadata(pages.arnoldSplit);

/** Mirrors IronBuddy's "Arnold Split (6×)" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Chest & Back A",
    focus: "Presses and pulls, paired",
    exercises: [
      "Machine Chest Press 3×10–12",
      "Lat Pulldown 3×10–12",
      "Incline Dumbbell Bench Press 3×10–12",
      "Chest-Supported Row 3×10–12",
      "Cable Fly 2×12–15",
      "Straight-Arm Cable Pulldown 2×12–15",
    ],
  },
  {
    day: "Shoulders & Arms A",
    focus: "Delts, biceps, triceps",
    exercises: [
      "Machine Shoulder Press 3×10–12",
      "Dumbbell Lateral Raise 3×12–15",
      "Reverse Pec Deck 2×12–15",
      "EZ-Bar Curl 3×10–12",
      "Cable Triceps Pushdown 3×10–12",
      "Incline Dumbbell Curl 2×12–15",
      "Overhead Cable Triceps Extension 2×12–15",
    ],
  },
  {
    day: "Legs A",
    focus: "Quads, hamstrings, calves",
    exercises: [
      "Leg Press 3×10–12",
      "Dumbbell Romanian Deadlift 3×10–12",
      "Leg Extension 2×12–15",
      "Seated Leg Curl 3×12–15",
      "Standing Calf Raise 3×12–15",
    ],
  },
  {
    day: "Chest & Back B",
    focus: "Different angles",
    exercises: [
      "Incline Machine Chest Press 3×10–12",
      "Seated Cable Row 3×10–12",
      "Dumbbell Bench Press 2×10–12",
      "Neutral-Grip Lat Pulldown 3×10–12",
      "Pec Deck 2×12–15",
      "One-Arm Dumbbell Row 2×12 per side",
    ],
  },
  {
    day: "Shoulders & Arms B",
    focus: "Delts, biceps, triceps",
    exercises: [
      "Machine Shoulder Press 2×10–12",
      "Cable Lateral Raise 3×12–15",
      "Reverse Pec Deck 3×12–15",
      "Dumbbell Hammer Curl 3×12–15",
      "Cable Biceps Curl 2×12–15",
      "Rope Triceps Pushdown 3×12–15",
      "Overhead Cable Triceps Extension 2×12–15",
    ],
  },
  {
    day: "Legs B",
    focus: "Quads, glutes, hamstrings, calves",
    exercises: [
      "Hack Squat 3×10–12",
      "Hip Thrust 3×10–12",
      "Bulgarian Split Squat 2×10–12 per leg",
      "Lying Leg Curl 3×12–15",
      "Leg Extension 2×12–15",
      "Seated Calf Raise 3×12–15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "Six days, Monday to Saturday",
    week: "Chest & Back A, Shoulders & Arms A, Legs A, Chest & Back B, Shoulders & Arms B, Legs B, rest",
    fits: "The split as written. Every muscle twice a week, one rest day. Only for people who recover from six sessions.",
  },
  {
    name: "Three on, one off",
    week: "Chest & Back, Shoulders & Arms, Legs, rest, then repeat with the B days",
    fits: "The same six days with a rest after every three. The cycle takes eight days, so it does not line up with the calendar.",
  },
  {
    name: "Three days a week",
    week: "Chest & Back A, Shoulders & Arms A, Legs A one week; the B days the next",
    fits: "The Arnold grouping at a normal frequency: each muscle once a week, like a bro split, but with chest and back paired.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-arnold-why-chest-back",
    question: "Why train chest and back on the same day?",
    answer:
      "They are opposite movements: a press and a pull. Pairing them lets you alternate exercises with little rest, because the back rests while the chest works, and the pump in both at once was part of the appeal for Arnold. The preset keeps them alternated: press, pull, press, pull.",
  },
  {
    id: "faq-arnold-original",
    question: "Is this what Arnold actually did?",
    answer:
      "Not exactly. Arnold's own routines ran six days a week with far more sets, sometimes two sessions a day, and heavy barbell work. The grouping (chest and back, shoulders and arms, legs, each twice a week) is the part that survives. IronBuddy's preset is that grouping on machines and dumbbells at a volume a normal person can recover from.",
  },
  {
    id: "faq-arnold-beginner",
    question: "Can a beginner run the Arnold split?",
    answer:
      "Six days a week is too much for most beginners, and the three-day version is just a bro split with different pairings. Start with a three-day full body plan or Push Pull Legs. Come to the Arnold split when you have a year or so of training behind you and genuinely want six sessions a week.",
  },
];

export default function ArnoldSplitGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.arnoldSplit);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.arnoldSplit, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="The Arnold split: chest and back, shoulders and arms, legs, twice a week"
        updated={pages.arnoldSplit.modified}
        lead="The Arnold split groups the body into three days, chest with back, shoulders with arms, and legs, and runs each twice a week for six sessions. It is a high-frequency, high-volume bodybuilding split named after the routine Arnold Schwarzenegger trained on in the 1970s. Done at a sane volume, it is a strong option for experienced lifters with six days to spare."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Three pairings: chest &amp; back, shoulders &amp; arms, legs. Each twice a week, six sessions.</li>
            <li>Chest and back are opposite movements, so they alternate well in one session.</li>
            <li>Every muscle is trained twice a week; the A and B days use different exercises.</li>
            <li>It demands recovery. If six days is too many, run it three on, one off, or move to Push Pull Legs.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What the Arnold split is">
          <p>
            The Arnold split is a three-way split run twice a week. Where{" "}
            <TextLink href={pages.pushPullLegs.path}>Push Pull Legs</TextLink> separates presses from
            pulls, the Arnold split puts them together: chest and back share a day, shoulders and arms
            share a day, and legs have their own. Six sessions a week cover each pairing twice.
          </p>
          <p>
            The chest-and-back pairing is the signature. Because a press and a row use opposite
            muscles, you can alternate them with short rests and get through a lot of work in an hour.
            Shoulders and arms go together because they are all smaller muscles that recover quickly.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            These are the six days of IronBuddy&apos;s Arnold Split (6×) preset. The A and B days train
            the same muscles with different exercises and angles. Rest about 2 minutes after the main
            presses and leg work, 90 seconds after rows and pulldowns, a minute after isolation sets.
          </p>
          <SplitDayTable days={days} caption="The six days of the Arnold split with the exercises, sets and reps of each" />
          <p>
            On the shoulder-and-arm days the preset suggests pairing biceps and triceps as supersets
            now and then: a curl straight into a pushdown, rest, repeat. It saves time and suits the
            spirit of the split. IronBuddy logs supersets as a set technique, so the pairing is kept
            with the set.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits">
          <BulletList>
            <li>
              <Strong>Experienced lifters with six days.</Strong> Twice-a-week frequency with full
              sessions for every area, if you can recover from it.
            </li>
            <li>
              <Strong>People who like the chest-and-back day.</Strong> Some lifters find it the best
              session of the week; if that is you, this is the split built around it.
            </li>
            <li>
              <Strong>Not for:</Strong> beginners, or anyone with four days or fewer. The{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> gets the same
              frequency in four days, and a <TextLink href={pages.broSplit.path}>bro split</TextLink>{" "}
              gives the same one-area focus at five.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track the Arnold split">
          <BulletList>
            <li>
              <Strong>A against A, B against B.</Strong> Chest &amp; Back A this week against Chest
              &amp; Back A last week. Each exercise appears on one day only, so IronBuddy&apos;s
              per-exercise comparison lines up with the day automatically.
            </li>
            <li>
              <Strong>Watch the weekly total.</Strong> Six sessions add up fast. Muscle Balance on
              IronBuddy&apos;s Home shows your sets per body area; chest and back should land around
              the same number, and shoulders should not run away because they get work on four days
              (two directly, two from pressing).
            </li>
            <li>
              <Strong>Recovery is the limit, not volume.</Strong> If the B days are consistently worse
              than the A days, the week is too long. Drop to three on, one off before dropping sets.
            </li>
            <li>
              <Strong>Progress the first two lifts of each day.</Strong> When they hit the top of the
              rep range on every set, add weight. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              covers the method.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running the Arnold split in IronBuddy">
          <RunInIronBuddy
            preset="Arnold Split (6×)"
            note="It is a six-day preset, Monday to Saturday; use Edit Week for a three-on, one-off layout, and the Superset technique when you pair biceps and triceps."
          />
        </ContentSection>

        <ContentSection id="faq" title="Arnold split questions">
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

        <RelatedLinks items={[pages.pushPullLegs, pages.broSplit, pages.setTechniques, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
