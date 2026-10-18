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

export const metadata: Metadata = pageMetadata(pages.fullBody);

/** Mirrors IronBuddy's "Full Body 3×" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Full Body A",
    focus: "Legs, chest, back, shoulders, arms",
    exercises: [
      "Leg Press 3×10–12",
      "Machine Chest Press 3×10–12",
      "Lat Pulldown 3×10–12",
      "Dumbbell Romanian Deadlift 2×10–12",
      "Dumbbell Lateral Raise 2×12–15",
      "Cable Triceps Pushdown 2×12–15",
      "Dumbbell Biceps Curl 2×12–15",
    ],
  },
  {
    day: "Full Body B",
    focus: "Legs, chest, back, shoulders, core",
    exercises: [
      "Goblet Squat 3×10–12",
      "Incline Dumbbell Bench Press 3×10–12",
      "Seated Cable Row 3×10–12",
      "Seated Leg Curl 3×12–15",
      "Machine Shoulder Press 2×10–12",
      "Standing Calf Raise 2×12–15",
      "Cable Crunch 2×12–15",
    ],
  },
  {
    day: "Full Body C",
    focus: "Legs, glutes, chest, back, arms",
    exercises: [
      "Hack Squat 3×10–12",
      "Machine Chest Press 3×10–12",
      "Chest-Supported Row 3×10–12",
      "Hip Thrust 2×10–12",
      "Reverse Pec Deck 2×12–15",
      "EZ-Bar Curl 2×12–15",
      "Rope Triceps Pushdown 2×12–15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "Monday, Wednesday, Friday",
    week: "A, rest, B, rest, C, rest, rest",
    fits: "The classic layout. A day of rest between every session and the weekend off.",
  },
  {
    name: "Tuesday, Thursday, Saturday",
    week: "rest, A, rest, B, rest, C, rest",
    fits: "The same spacing shifted a day, for people whose Mondays never work out.",
  },
  {
    name: "Twice a week",
    week: "A, rest, rest, B, rest, rest, rest, then C, A, B the next weeks",
    fits: "The minimum that still makes progress. The three days rotate, so each comes round every ten days or so.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-full-body-beginner",
    question: "Is a full body workout the best way to start?",
    answer:
      "For most beginners, yes. Every muscle gets practised three times a week, which is what learning a movement needs, the sessions are short enough to finish, and a missed day costs you a third of a week instead of a whole muscle group. IronBuddy lists its Full Body 3× preset as Beginner.",
  },
  {
    id: "faq-full-body-how-long",
    question: "How long should I stay on full body?",
    answer:
      "As long as the numbers keep going up. Many people run it for six months to a year. When adding weight stalls on most lifts, or you want more sets for a particular muscle than a full body day can fit, move to an Upper Lower split, which keeps the same twice-a-week frequency over four days.",
  },
  {
    id: "faq-full-body-order",
    question: "Does the exercise order matter?",
    answer:
      "Start with the biggest lift while you are fresh, usually the leg exercise, then the press and the pull, then the smaller isolation work. If your legs are the priority, keep that order; if an upper-body lift is the one you most want to progress, put it first on that day.",
  },
];

export default function FullBodyGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.fullBody);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.fullBody, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="Full body workout, three days a week: plan and track it"
        updated={pages.fullBody.modified}
        lead="A three-day full body plan trains every major muscle in each session, three times a week, with a day of rest between. It is the plan most coaches hand to a beginner, and for good reason: the sessions are short, every movement gets practised often, and progress is easy to see from week to week."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Three sessions a week, each with a leg exercise, a press, a pull and a little isolation work.</li>
            <li>Three different days (A, B, C) so no exercise is repeated more than once a week.</li>
            <li>Every muscle is trained three times a week, which suits beginners and people short on time.</li>
            <li>Compare each day with the same day last week; add weight when you reach the top of the rep range.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What a full body split is">
          <p>
            Most training splits divide the body across the week: push and pull, upper and lower, one
            muscle a day. A full body plan does the opposite. Every session covers the whole body with
            one or two exercises per area, and you repeat that three times a week. Each session does a
            little for every muscle instead of a lot for a few.
          </p>
          <p>
            That is why it works so well early on. Strength in the first year comes largely from
            learning the movements, and practising a press three times a week teaches it faster than
            once. It also keeps the stakes low: skip Wednesday and you have still trained everything
            twice.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            IronBuddy&apos;s Full Body 3× preset uses three different days so the week stays varied:
            a leg press, a goblet squat and a hack squat each get a day, as do three different rows and
            pulldowns. Every day has seven exercises and takes about 45 to 60 minutes.
          </p>
          <SplitDayTable days={days} caption="The three days of a full body workout plan with the exercises, sets and reps of each" />
          <p>
            Rest about 2 minutes after the leg and chest work, 90 seconds after rows and pulldowns,
            and a minute after the small stuff. If an exercise is not available, swap it for the same
            movement with different equipment: a dumbbell press for the machine press, a leg curl
            machine of any kind for the seated one.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
          <p>
            Keep at least one rest day between sessions. Two full body days back to back means
            training legs on tired legs, and the second session suffers for it.
          </p>
        </ContentSection>

        <ContentSection id="who-it-suits" title="Who it suits">
          <BulletList>
            <li>
              <Strong>Beginners.</Strong> It is the simplest plan to follow and the one that teaches the
              lifts fastest.
            </li>
            <li>
              <Strong>People with two or three days.</Strong> Nothing else trains everything on so few
              days.
            </li>
            <li>
              <Strong>Anyone coming back.</Strong> After a break, three moderate sessions rebuild the
              habit without the soreness of a dedicated leg day.
            </li>
            <li>
              <Strong>Less suited to:</Strong> lifters who need a lot of sets for one muscle. Seven
              exercises across the whole body leaves two or three sets per muscle per session. When
              that stops being enough, an{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> is the natural next
              step.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track a full body plan">
          <BulletList>
            <li>
              <Strong>Same day, last week.</Strong> Day A this Monday against Day A last Monday. With
              three different days, that is the only comparison that lines up, and IronBuddy makes it
              for every exercise when you open the summary.
            </li>
            <li>
              <Strong>One number at a time.</Strong> On a 10–12 rep range, get all sets to 12, then add
              the smallest weight your gym allows and drop back to 10. Read{" "}
              <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>{" "}
              for the full method.
            </li>
            <li>
              <Strong>Watch weekly sets, not daily ones.</Strong> Two sets of curls on a day looks like
              nothing; six a week across three days is a fair amount for a beginner. Muscle Balance on
              IronBuddy&apos;s Home adds them up by body area.
            </li>
            <li>
              <Strong>Write down what you changed.</Strong> Seat positions, a swapped exercise, a short
              night. The note explains the number a month later.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running Full Body 3× in IronBuddy">
          <RunInIronBuddy
            preset="Full Body 3×"
            note="It is listed as Beginner and set to Monday, Wednesday and Friday; move the days with Edit Week."
          />
        </ContentSection>

        <ContentSection id="faq" title="Full body workout questions">
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

        <RelatedLinks items={[pages.upperLower, pages.logWorkouts, pages.progressiveOverload, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
