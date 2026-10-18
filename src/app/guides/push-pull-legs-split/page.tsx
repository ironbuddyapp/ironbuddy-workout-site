import type { Metadata } from "next";
import {
  BulletList,
  Callout,
  ContentSection,
  NumberedList,
  PageBody,
  Strong,
  TextLink,
} from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { trialDetails } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.pushPullLegs);

/**
 * General training information. The lifts mirror IronBuddy's "Push / Pull / Legs (3×)" template
 * (app 1.0.13, src/lib/seed-data.ts), written as plain exercise names rather than library entries.
 */
const days = [
  {
    day: "Push",
    muscles: "Chest, shoulders, triceps",
    lifts: "Bench press, incline dumbbell press, overhead press, skull crushers, close-grip bench press",
  },
  {
    day: "Pull",
    muscles: "Back, biceps, rear shoulders",
    lifts: "Deadlift, chin-ups, seated cable rows, barbell curls",
  },
  {
    day: "Legs",
    muscles: "Quads, hamstrings, glutes, calves",
    lifts: "Squat, Romanian deadlift, standing calf raises, plank",
  },
];

const layouts = [
  {
    name: "3 days a week",
    week: "Push, rest, Pull, rest, Legs, rest, rest",
    fits: "Beginners, busy weeks, or anyone who recovers slowly. Each muscle group is trained once a week.",
  },
  {
    name: "6 days a week",
    week: "Push, Pull, Legs, Push, Pull, Legs, rest",
    fits: "Experienced lifters with time to recover. Each muscle group is trained twice a week.",
  },
  {
    name: "Rolling",
    week: "Push, Pull, Legs, rest, then repeat",
    fits: "People whose training days change week to week. The cycle does not line up with the calendar.",
  },
];

export default function PushPullLegsGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.pushPullLegs);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.pushPullLegs, { trail: crumbs, article: true })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide"
        title="Push Pull Legs split: how to plan and track it"
        updated={pages.pushPullLegs.modified}
        lead="A Push Pull Legs split, or PPL, groups your training by movement: pushing muscles one day, pulling muscles the next, then legs. It is simple to plan, easy to repeat, and works at three or six days a week."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Push trains chest, shoulders and triceps. Pull trains back and biceps. Legs trains the lower body.</li>
            <li>Run it three days a week to train each muscle once, or six days to train each twice.</li>
            <li>Start each day with a heavy compound lift, then add smaller exercises for volume.</li>
            <li>Compare each day with the same day last time, so your progress lines up.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What a Push Pull Legs split is">
          <p>
            A split decides which muscles you train on which day. Push Pull Legs divides the body by
            the direction of the movement. Pressing exercises share the chest, front shoulders and
            triceps, so they go together. Pulling exercises share the back, rear shoulders and
            biceps. Legs get a day of their own.
          </p>
          <p>
            Because each day works muscles that help each other, one day&apos;s training does not
            tire out the next day&apos;s. That makes PPL easy to repeat week after week.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                The three days of a Push Pull Legs split, the muscles each one trains, and example lifts
              </caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Day
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Muscles
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Example lifts
                  </th>
                </tr>
              </thead>
              <tbody>
                {days.map((row, index) => (
                  <tr
                    key={row.day}
                    className={index !== days.length - 1 ? "border-b border-white/8" : undefined}
                  >
                    <th scope="row" className="px-3 py-3 align-top font-medium text-white sm:px-6">
                      {row.day}
                    </th>
                    <td className="px-3 py-3 align-top sm:px-6">{row.muscles}</td>
                    <td className="px-3 py-3 align-top sm:px-6">{row.lifts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Put the heaviest compound lift first, while you are fresh, and the smaller isolation
            exercises after it. Swap any lift for a variation that suits your equipment or joints: a
            dumbbell press for a barbell press, or a leg press for a squat.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="Three-day, six-day and rolling layouts">
          <ul className="space-y-3">
            {layouts.map((layout) => (
              <li key={layout.name} className="rounded-2xl border border-white/8 bg-surface p-5">
                <h3 className="text-base font-semibold tracking-tight text-white">{layout.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-semibold text-primary">Week: </span>
                  {layout.week}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed">
                  <span className="font-semibold text-white">Suits: </span>
                  {layout.fits}
                </p>
              </li>
            ))}
          </ul>
          <p>
            If you miss a day, do that day next time instead of skipping to the following one. The
            order matters more than the weekday.
          </p>
        </ContentSection>

        <ContentSection id="tracking" title="How to track a PPL split">
          <BulletList>
            <li>
              <Strong>Compare like with like.</Strong> Check this Push day against your last Push
              day. On a six-day split, the two Push days may use different rep ranges, so compare
              each with its own previous session.
            </li>
            <li>
              <Strong>Progress one lift at a time.</Strong> Add a rep or a small amount of weight when
              you hit the top of your rep range. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              explains double progression step by step.
            </li>
            <li>
              <Strong>Watch weekly volume.</Strong> If a muscle group&apos;s volume keeps climbing
              while your form holds up, the split is doing its job.
            </li>
            <li>
              <Strong>Note what changed.</Strong> A new grip, a swapped exercise or a poor night&apos;s
              sleep explains a strange number later.
            </li>
          </BulletList>
          <p>
            For what else is worth recording, see{" "}
            <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running Push Pull Legs in IronBuddy">
          <p>
            IronBuddy includes two Push Pull Legs templates: Push / Pull / Legs (3×) and Push / Pull
            / Legs (6×). They sit beside eight other built-in splits, including Full Body, Upper /
            Lower, PHUL, PHAT and 5/3/1.
          </p>
          <NumberedList>
            <li>Open Splits and choose the three-day or six-day Push / Pull / Legs template.</li>
            <li>Use Set active so the home screen shows this week&apos;s Push, Pull and Legs days.</li>
            <li>
              Change any exercise to suit your gym. The first time you edit a built-in template,
              IronBuddy saves your version as your own copy.
            </li>
            <li>Open each day from the home screen, enter your reps and weight, and tap Log workout.</li>
            <li>Check Progress to follow volume and 1RM (one-rep max), calculated with the Epley formula, for each lift over time.</li>
          </NumberedList>
          <p>
            {trialDetails.includes} {trialDetails.unlocks} See{" "}
            <TextLink href={pages.trainingSplits.path}>training splits in IronBuddy</TextLink>{" "}
            for screenshots.
          </p>
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Choose loads and a
            weekly layout that suit your experience and recovery, and speak to a qualified
            professional if you have an injury or a health condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks
          items={[pages.upperLower, pages.arnoldSplit, pages.progressiveOverload, pages.trainingSplits]}
        />
      </PageBody>
    </main>
  );
}
