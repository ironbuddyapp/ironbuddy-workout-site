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

export const metadata: Metadata = pageMetadata(pages.phat);

/** Mirrors IronBuddy's "PHAT" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Upper Power",
    focus: "Heavier upper-body compounds",
    exercises: [
      "Machine Chest Press 3×10",
      "Chest-Supported Row 3×10",
      "Incline Dumbbell Bench Press 3×10",
      "Lat Pulldown 3×10",
      "Machine Shoulder Press 2×10",
      "EZ-Bar Curl 2×12",
      "Cable Triceps Pushdown 2×12",
    ],
  },
  {
    day: "Lower Power",
    focus: "Heavier leg compounds",
    exercises: [
      "Leg Press 3×10",
      "Dumbbell Romanian Deadlift 3×10",
      "Hack Squat 2×10",
      "Seated Leg Curl 3×12",
      "Standing Calf Raise 3×12",
    ],
  },
  {
    day: "Back & Shoulders Hypertrophy",
    focus: "Lats, upper back, rear and side delts, biceps",
    exercises: [
      "Neutral-Grip Lat Pulldown 3×12",
      "Seated Cable Row 3×12",
      "One-Arm Dumbbell Row 2×12 per side",
      "Dumbbell Lateral Raise 3×15",
      "Reverse Pec Deck 3×15",
      "Cable Biceps Curl 2×15",
    ],
  },
  {
    day: "Lower Hypertrophy",
    focus: "Quads, glutes, hamstrings, calves, core",
    exercises: [
      "Hack Squat 3×12",
      "Hip Thrust 3×12",
      "Leg Extension 2×15",
      "Lying Leg Curl 3×15",
      "Seated Calf Raise 3×15",
      "Cable Crunch 2×15",
    ],
  },
  {
    day: "Chest & Arms Hypertrophy",
    focus: "Chest, biceps, triceps",
    exercises: [
      "Incline Dumbbell Bench Press 3×12",
      "Machine Chest Press 3×12",
      "Cable Fly 2×15",
      "EZ-Bar Curl 3×12",
      "Incline Dumbbell Curl 2×15",
      "Cable Triceps Pushdown 3×12",
      "Overhead Cable Triceps Extension 2×15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "The standard week",
    week: "Upper Power, Lower Power, rest, Back & Shoulders, Lower Hypertrophy, Chest & Arms, rest (Mon / Tue / Thu / Fri / Sat)",
    fits: "The layout PHAT was written for: the two heavy days first, a rest day, then the three volume days.",
  },
  {
    name: "Weekend off",
    week: "Upper Power, Lower Power, Back & Shoulders, rest, Lower Hypertrophy, Chest & Arms, rest",
    fits: "People who cannot train Saturdays. Three days in a row is tolerable because the third is an upper day after a lower day.",
  },
  {
    name: "Four days, rotating",
    week: "Any four of the five in order, then carry on from the fifth the week after",
    fits: "A busy week now and then. Do not drop the same day every time, or that body part falls behind.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-phat-vs-original",
    question: "How does this differ from Layne Norton's PHAT?",
    answer:
      "The original PHAT uses 3–5 reps on barbell lifts for the power days and starts the hypertrophy days with a fast, light 'speed' version of the power lift before the volume work. IronBuddy's preset keeps the five-day structure and the power/hypertrophy split but uses 10 reps on the power days, 12–15 on the hypertrophy days, no speed work, and machines and dumbbells throughout. It is a simplified version for lifters who are not yet doing heavy barbell work.",
  },
  {
    id: "faq-phat-vs-phul",
    question: "PHAT or PHUL?",
    answer:
      "PHUL is the four-day version: two power days and two hypertrophy days. PHAT adds a third hypertrophy day, so the volume days become back and shoulders, legs, and chest and arms instead of upper and lower. If four days a week is what you have, PHUL; if you have five and recover well, PHAT.",
  },
  {
    id: "faq-phat-beginner",
    question: "Can a beginner run PHAT?",
    answer:
      "It is a lot. Five sessions a week with five to seven exercises each is more volume than most beginners need or recover from. Start with a three-day full body plan or Upper Lower, and come to PHAT once the heavy days feel like something you want more of, not something to get through.",
  },
];

export default function PhatGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.phat);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.phat, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="The PHAT workout: five-day Power Hypertrophy Adaptive Training"
        updated={pages.phat.modified}
        lead="The PHAT workout, short for Power Hypertrophy Adaptive Training, is a five-day split by Layne Norton. Two heavy days early in the week train the upper and lower body for strength; three higher-rep days later in the week train back and shoulders, legs, and chest and arms for size. It is demanding, and for people who recover from it, it covers everything."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Five days: Upper Power, Lower Power, then Back &amp; Shoulders, Lower and Chest &amp; Arms hypertrophy days.</li>
            <li>Power days are heavier with longer rests; hypertrophy days have more exercises and higher reps.</li>
            <li>Every muscle is trained twice a week: once heavy, once for volume.</li>
            <li>It needs five sessions and good recovery. If four days is your limit, PHUL is the same idea.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What PHAT is">
          <p>
            PHAT is the five-day cousin of <TextLink href={pages.phul.path}>PHUL</TextLink>. The two
            power days are the same idea: the big compound lifts, heavier, with long rests. The
            difference is in the hypertrophy half of the week. Instead of one upper and one lower
            volume day, PHAT has three, split by body part: back and shoulders, legs, then chest and
            arms. That gives every area a dedicated session with enough exercises to work it from more
            than one angle.
          </p>
          <p>
            The name comes from the idea that the programme adapts: the heavy days build strength that
            raises the loads on the volume days, and the volume days build muscle that raises the
            heavy days. The weekly rhythm is heavy, heavy, rest, volume, volume, volume, rest.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            These are the five days of IronBuddy&apos;s PHAT preset, a simplified version on machines
            and dumbbells. Power days use 10 reps and 2-minute rests on the main lifts; hypertrophy
            days 12 to 15 reps with 60 to 90 seconds.
          </p>
          <SplitDayTable days={days} caption="The five days of PHAT with the exercises, sets and reps of each" />
          <p>
            The two power days are shared with PHUL. If you move between the two programmes, your
            logged numbers for those days carry straight over.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits">
          <BulletList>
            <li>
              <Strong>Intermediate and advanced lifters</Strong> with five days a week and the sleep
              and food to recover from them.
            </li>
            <li>
              <Strong>People with a lagging body part.</Strong> A whole day for back and shoulders,
              or chest and arms, is room to add sets where you need them.
            </li>
            <li>
              <Strong>Not for:</Strong> beginners, or anyone whose week has four slots or fewer.{" "}
              <TextLink href={pages.phul.path}>PHUL</TextLink> or an{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> gives the same
              twice-a-week frequency in four days.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track PHAT">
          <BulletList>
            <li>
              <Strong>Power days by weight, hypertrophy days by volume.</Strong> The estimated 1RM
              chart tells you whether the heavy days are working; the volume chart and your rep counts
              tell you about the volume days.
            </li>
            <li>
              <Strong>Same day, last week.</Strong> With five different days, the only comparison that
              lines up is each day against itself a week ago. IronBuddy&apos;s workout summary does
              that per exercise when you log.
            </li>
            <li>
              <Strong>Count weekly sets by muscle.</Strong> PHAT spreads chest over two days (Upper
              Power and Chest &amp; Arms) and back over two (Upper Power and Back &amp; Shoulders).
              Muscle Balance on Home adds them up, so you can see whether an area is getting too little
              or too much.
            </li>
            <li>
              <Strong>Recovery first.</Strong> On a five-day split, falling numbers on Friday and
              Saturday usually mean too much, not too little. Drop a set from the volume days before
              adding anything.
            </li>
          </BulletList>
          <p>
            The <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
            explains how to add weight and reps without guessing.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running PHAT in IronBuddy">
          <RunInIronBuddy
            preset="PHAT"
            note="It is a five-day preset; use Edit Week to put the days on Mon / Tue / Thu / Fri / Sat or whatever your week allows."
          />
        </ContentSection>

        <ContentSection id="faq" title="PHAT questions">
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

        <RelatedLinks items={[pages.phul, pages.upperLower, pages.broSplit, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
