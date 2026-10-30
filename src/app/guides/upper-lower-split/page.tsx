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

export const metadata: Metadata = pageMetadata(pages.upperLower);

/** Mirrors IronBuddy's "Upper / Lower" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Upper A",
    focus: "Chest, back, shoulders, arms",
    exercises: [
      "Machine Chest Press 3×10–12",
      "Lat Pulldown 3×10–12",
      "Incline Dumbbell Bench Press 2×10–12",
      "Seated Cable Row 3×10–12",
      "Dumbbell Lateral Raise 2×12–15",
      "Cable Biceps Curl 2×12–15",
      "Cable Triceps Pushdown 2×12–15",
    ],
  },
  {
    day: "Lower A",
    focus: "Quads, hamstrings, calves, core",
    exercises: [
      "Leg Press 3×10–12",
      "Dumbbell Romanian Deadlift 3×10–12",
      "Leg Extension 2×12–15",
      "Seated Leg Curl 3×12–15",
      "Standing Calf Raise 3×12–15",
      "Cable Crunch 2×12–15",
    ],
  },
  {
    day: "Upper B",
    focus: "Chest, back, shoulders, arms",
    exercises: [
      "Incline Machine Chest Press 3×10–12",
      "Chest-Supported Row 3×10–12",
      "Neutral-Grip Lat Pulldown 3×10–12",
      "Machine Shoulder Press 2×10–12",
      "Reverse Pec Deck 2×12–15",
      "Dumbbell Hammer Curl 2×12–15",
      "Overhead Cable Triceps Extension 2×12–15",
    ],
  },
  {
    day: "Lower B",
    focus: "Quads, glutes, hamstrings, calves, core",
    exercises: [
      "Hack Squat 3×10–12",
      "Hip Thrust 3×10–12",
      "Bulgarian Split Squat 2×10–12 per leg",
      "Lying Leg Curl 3×12–15",
      "Seated Calf Raise 3×12–15",
      "Hanging Knee Raise 2×12–15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "Four days, two on, one off",
    week: "Upper A, Lower A, rest, Upper B, Lower B, rest, rest (Mon / Tue / Thu / Fri)",
    fits: "Most people. Every muscle is trained twice a week, with a full day off in the middle and the weekend free.",
  },
  {
    name: "Four days, spread out",
    week: "Upper A, rest, Lower A, rest, Upper B, Lower B, rest",
    fits: "Lifters who recover slowly or whose weekends are the easiest days to train.",
  },
  {
    name: "Three days, rotating",
    week: "Upper A, Lower A, Upper B, then next week Lower B, Upper A, Lower A, and so on",
    fits: "Busy weeks. Each day still comes round in order, but the cycle takes longer than a calendar week.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-upper-lower-vs-ppl",
    question: "Upper Lower or Push Pull Legs?",
    answer:
      "Both train each muscle twice a week when run as written. Upper Lower does it in four days, so it suits a four-day week; a twice-a-week PPL needs six. If you can only train three or four times a week, Upper Lower is the easier one to keep up.",
  },
  {
    id: "faq-upper-lower-beginners",
    question: "Is an Upper Lower split good for beginners?",
    answer:
      "Yes. Each day has a clear job, the exercises are mostly machines and dumbbells, and nothing is trained on consecutive days. IronBuddy lists its Upper / Lower preset as Beginner for that reason. A three-day full body plan is the other common starting point.",
  },
  {
    id: "faq-upper-lower-missed-day",
    question: "What if I miss a day?",
    answer:
      "Do the day you missed next, and let the rest of the week shift. The order (Upper A, Lower A, Upper B, Lower B) matters more than the weekday, because A and B use different exercises for the same muscles.",
  },
];

export default function UpperLowerGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.upperLower);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.upperLower, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="Upper Lower split: a four-day plan and how to track it"
        updated={pages.upperLower.modified}
        lead="An Upper Lower split divides the body in two: upper-body days for chest, back, shoulders and arms, lower-body days for legs and core. Run it four days a week and every muscle gets trained twice, with the whole weekend free. It is one of the simplest splits to plan and one of the easiest to keep up."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Two upper days and two lower days a week; every muscle twice a week.</li>
            <li>A and B days use different exercises for the same muscles, so the week stays varied.</li>
            <li>Four days fits Mon / Tue / Thu / Fri; a three-day rotating version works for busy weeks.</li>
            <li>Compare Upper A with your last Upper A, not with Upper B.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What an Upper Lower split is">
          <p>
            A training split decides which muscles you train on which day. Upper Lower is the
            simplest split that still trains everything twice a week: one day for everything above
            the hips, one day for everything below, repeated. Because the two halves do not share
            muscles, an upper day never gets in the way of the lower day after it.
          </p>
          <p>
            Compared with a <TextLink href={pages.fullBody.path}>three-day full body plan</TextLink>,
            each session is more focused and you can give every muscle more sets. Compared with a{" "}
            <TextLink href={pages.pushPullLegs.path}>Push Pull Legs split</TextLink>, you get the same
            twice-a-week frequency in four days instead of six.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            These are the four days of IronBuddy&apos;s Upper / Lower preset. Every day starts with
            the heaviest compound movement and ends with the smaller isolation work. Rest 2 minutes
            after the big presses, pulls and leg work and about a minute after the isolation sets.
          </p>
          <SplitDayTable days={days} caption="The four days of an Upper Lower split with the exercises, sets and reps of each" />
          <p>
            Swap any exercise for one that suits your gym or your joints: a barbell bench press for
            the machine press, a leg press for the hack squat, pull-ups for the pulldown. Keep the
            movement pattern and the sets, and the day still does its job.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="Three ways to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits, and who should pick something else">
          <BulletList>
            <li>
              <Strong>Good for:</Strong> anyone who can train four days a week and wants a plan that
              needs no thinking. Beginners after a few months of full body work, and intermediates who
              want more sets per muscle than a full body day allows.
            </li>
            <li>
              <Strong>Watch out for:</Strong> upper days are long. Seven exercises for chest, back,
              shoulders and arms takes most people 60 to 75 minutes. If that is too long, drop the last
              isolation exercise on each upper day rather than rushing the compounds.
            </li>
            <li>
              <Strong>Pick something else if:</Strong> you can only train twice a week (use full body),
              or you want a dedicated day for a lagging muscle group (a{" "}
              <TextLink href={pages.broSplit.path}>bro split</TextLink> or{" "}
              <TextLink href={pages.phat.path}>PHAT</TextLink> gives you that).
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track an Upper Lower split">
          <BulletList>
            <li>
              <Strong>Compare A with A.</Strong> Upper A and Upper B train the same muscles with
              different exercises, so progress shows up when you compare this Upper A with your last
              Upper A, two sessions ago. IronBuddy does this per exercise automatically.
            </li>
            <li>
              <Strong>Progress the compounds first.</Strong> When you hit 12 reps on every set of the
              leg press or chest press, add weight next time and drop back to 10. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              explains this double progression step by step.
            </li>
            <li>
              <Strong>Check the balance.</Strong> Two upper and two lower days should give chest, back
              and legs a similar number of sets each week. If your Muscle Balance shows back far below
              chest, add a set to the rows rather than the presses.
            </li>
            <li>
              <Strong>Note the small things.</Strong> Seat height on the chest press, the pin on the
              cable stack, which side you started the split squats on. A number that looks wrong
              later usually has a note that explains it.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running Upper Lower in IronBuddy">
          <RunInIronBuddy
            preset="Upper / Lower"
            note="It is listed as Beginner and set to Mon / Tue / Thu / Fri; change the days with Edit Week."
          />
        </ContentSection>

        <ContentSection id="faq" title="Upper Lower questions">
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

        <RelatedLinks items={[pages.phul, pages.fullBody, pages.pushPullLegs, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
