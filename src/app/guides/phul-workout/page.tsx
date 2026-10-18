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

export const metadata: Metadata = pageMetadata(pages.phul);

/** Mirrors IronBuddy's "PHUL" preset (src/lib/seed-data.ts). */
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
    day: "Upper Hypertrophy",
    focus: "More reps, more isolation",
    exercises: [
      "Incline Dumbbell Bench Press 3×12",
      "Seated Cable Row 3×12",
      "Machine Chest Press 2×12",
      "Neutral-Grip Lat Pulldown 3×12",
      "Dumbbell Lateral Raise 3×15",
      "Dumbbell Hammer Curl 2×15",
      "Overhead Cable Triceps Extension 2×15",
    ],
  },
  {
    day: "Lower Hypertrophy",
    focus: "Quads, glutes, hamstrings, calves, core",
    exercises: [
      "Hack Squat 3×12",
      "Hip Thrust 3×12",
      "Bulgarian Split Squat 2×12 per leg",
      "Lying Leg Curl 3×15",
      "Leg Extension 2×15",
      "Seated Calf Raise 3×15",
      "Cable Crunch 2×15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "The standard week",
    week: "Upper Power, Lower Power, rest, Upper Hypertrophy, Lower Hypertrophy, rest, rest (Mon / Tue / Thu / Fri)",
    fits: "The layout PHUL was written for. Power days early in the week while you are freshest, a rest day, then the higher-rep days.",
  },
  {
    name: "Rest between every pair",
    week: "Upper Power, rest, Lower Power, rest, Upper Hypertrophy, rest, Lower Hypertrophy",
    fits: "Lifters who find two heavy days in a row too much. The cycle takes eight days, so it drifts across the calendar.",
  },
  {
    name: "Three days, rotating",
    week: "Upper Power, Lower Power, Upper Hypertrophy, then next week Lower Hypertrophy, Upper Power, Lower Power",
    fits: "Weeks with only three slots. Keep the order and the four days still come round in turn.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-phul-reps",
    question: "Why does this PHUL use 10 reps on power days, not 3 to 5?",
    answer:
      "Brandon Campbell's original PHUL puts the power days at 3–5 reps on barbell lifts. IronBuddy's preset is written for beginner-to-intermediate lifters on machines and dumbbells, so its power days use 10 reps with longer rest and heavier loads, and the hypertrophy days 12–15 with shorter rest. The structure is the same; if you are experienced with heavy barbell work, edit the power days down to 5–6 reps.",
  },
  {
    id: "faq-phul-vs-upper-lower",
    question: "PHUL or a plain Upper Lower split?",
    answer:
      "They share the four-day shape. PHUL adds a rule: the first upper and lower day of the week are heavier and lower-rep, the second pair lighter and higher-rep. If you like a plan with a clear purpose for each day, use PHUL; if you prefer every day to feel the same, plain Upper Lower is simpler.",
  },
  {
    id: "faq-phul-vs-phat",
    question: "PHUL or PHAT?",
    answer:
      "PHAT is the five-day version of the same idea, with two power days and three hypertrophy days. It is more volume and more time. Start with PHUL; move to PHAT if four days leave you recovered and wanting more.",
  },
];

export default function PhulGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.phul);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.phul, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="PHUL: the four-day Power Hypertrophy Upper Lower split"
        updated={pages.phul.modified}
        lead="PHUL stands for Power Hypertrophy Upper Lower. It is a four-day split with two upper-body and two lower-body sessions, where the first pair of the week is heavier and lower-rep and the second pair lighter and higher-rep. You get strength work and size work in the same week, and every muscle twice."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Four days: Upper Power, Lower Power, Upper Hypertrophy, Lower Hypertrophy.</li>
            <li>Power days: fewer reps, heavier weight, longer rest. Hypertrophy days: more reps, more isolation, shorter rest.</li>
            <li>Every muscle is trained twice a week, once heavy and once for volume.</li>
            <li>Track the power days by weight and the hypertrophy days by reps and volume.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What PHUL is">
          <p>
            PHUL was written by Brandon Campbell as an answer to a common problem: strength programmes
            leave you small and bodybuilding programmes leave you weak. It takes the four-day{" "}
            <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> and gives each half of
            the week a job. Monday and Tuesday are <Strong>power</Strong> days built around the big
            compound lifts; Thursday and Friday are <Strong>hypertrophy</Strong> days with more
            exercises, more reps and shorter rests.
          </p>
          <p>
            The heavy days make the lighter days better: the strength you build on Monday&apos;s
            press lets you use more weight on Thursday&apos;s 12s, and the extra volume on Thursday
            builds the muscle that lifts more on Monday.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            These are the four days of IronBuddy&apos;s PHUL preset. The power days use 10 reps with
            2-minute rests on the main lifts; the hypertrophy days 12 to 15 reps with 60 to 90
            seconds. The original programme uses 3–5 reps on barbell lifts for the power days; see the
            questions below if you want to run it that way.
          </p>
          <SplitDayTable days={days} caption="The four days of PHUL with the exercises, sets and reps of each" />
          <p>
            Power days have fewer exercises on purpose. Spend the time on the first three: those are
            the lifts you are trying to make heavier from month to month.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits">
          <BulletList>
            <li>
              <Strong>Intermediates who want both.</Strong> If you care about the number on the bar and
              how you look, PHUL gives each a day.
            </li>
            <li>
              <Strong>Lifters with a few months behind them.</Strong> IronBuddy lists its machine-based
              version as Intermediate, as the program&apos;s author does; learn the lifts on a full body or
              Upper Lower plan first, and keep the heavy barbell version for later.
            </li>
            <li>
              <Strong>Four days, not more.</Strong> PHUL does its work in four sessions. If you have
              five and recover well, <TextLink href={pages.phat.path}>PHAT</TextLink> is the same idea
              with an extra hypertrophy day.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track PHUL">
          <BulletList>
            <li>
              <Strong>Two different goals, two different numbers.</Strong> On power days, watch the
              weight on the main lifts and the estimated 1RM chart. On hypertrophy days, watch reps and
              session volume. A week where the 1RM climbs and the volume climbs is a good week.
            </li>
            <li>
              <Strong>Compare each day with itself.</Strong> Upper Power against last Upper Power,
              Upper Hypertrophy against last Upper Hypertrophy. The same exercise appears on both
              (the chest press, the incline press), so compare per day, not per exercise across days.
              IronBuddy&apos;s summary compares each exercise with its previous session, which on
              PHUL means the same day last week.
            </li>
            <li>
              <Strong>Add weight on power days, reps on hypertrophy days.</Strong> When every power
              set hits 10 clean reps, add weight. When every hypertrophy set hits 15, add weight and
              drop back to 12. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              covers both.
            </li>
            <li>
              <Strong>Watch recovery.</Strong> If Thursday&apos;s numbers fall while Monday&apos;s
              rise, you are not recovering from the heavy days. Take a set off the power days before
              you take one off the hypertrophy days.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running PHUL in IronBuddy">
          <RunInIronBuddy
            preset="PHUL"
            note="It is listed as Intermediate and set to Mon / Tue / Thu / Fri. To run the heavier original, edit the power days to 5–6 reps; your copy is saved under My splits."
          />
        </ContentSection>

        <ContentSection id="faq" title="PHUL questions">
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

        <RelatedLinks items={[pages.phat, pages.upperLower, pages.progressiveOverload, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
