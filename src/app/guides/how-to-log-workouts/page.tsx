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
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.logWorkouts);

export default function LogWorkoutsGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.logWorkouts);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.logWorkouts, { trail: crumbs, article: true })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide"
        title="How to log workouts: what to track and why"
        updated={pages.logWorkouts.modified}
        lead="How to log workouts comes down to this: a useful workout log records the few numbers that let you repeat and improve a session: what you did, how heavy it was, and how many reps you got. Anything beyond that is optional, and the best log is the one you actually keep."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Record the exercise, weight, reps, and sets. Everything else is optional.</li>
            <li>Log as you go, not from memory afterwards.</li>
            <li>Use one consistent name for each lift so your history lines up.</li>
            <li>Review your log weekly, and back it up.</li>
          </BulletList>
        </Callout>

        <ContentSection id="minimum" title="The minimum useful workout log">
          <BulletList>
            <li>
              <Strong>The date</Strong>
            </li>
            <li>
              <Strong>The exercise,</Strong> under the same name each time
            </li>
            <li>
              <Strong>The weight</Strong> you used
            </li>
            <li>
              <Strong>The reps</Strong> you completed in each set
            </li>
            <li>
              <Strong>The number of sets</Strong>
            </li>
          </BulletList>
          <p>
            With those five fields you can answer the two questions that matter at the start of any
            session: what did I do last time, and what should I try today?
          </p>
        </ContentSection>

        <ContentSection id="optional" title="Optional details worth adding">
          <BulletList>
            <li>
              <Strong>Notes:</Strong> a new grip, a pause, how the set felt, poor sleep, or pain.
            </li>
            <li>
              <Strong>Body weight and body fat:</Strong> only if they matter to your goal.
            </li>
            <li>
              <Strong>The training day:</Strong> Push, Pull, Legs, or whatever your split calls it.
            </li>
          </BulletList>
          <p>Add a detail only if you will read it later. A log you stop keeping is worth nothing.</p>
        </ContentSection>

        <ContentSection id="when-to-log" title="When to log">
          <p>
            Log each set right after you finish it, while the numbers are fresh. Logging later from
            memory is where mistakes creep in. If you prefer to log at the end of a session, jot the
            weights and reps down as you go and enter them straight after. If you miss a session,
            log it for the day it happened as soon as you can.
          </p>
        </ContentSection>

        <ContentSection id="naming" title="Keep exercise names consistent">
          <p>
            The same lift under two names splits your history in two, so you cannot see a trend.
            Choose one name per exercise and stick with it. A library that lists variations by
            equipment, such as barbell, dumbbell, or machine, makes it easier to pick the exact one
            you did.
          </p>
        </ContentSection>

        <ContentSection id="plan-first" title="Plan first, then log">
          <p>
            A training split tells you which exercises to expect on each day, so logging becomes
            filling in numbers instead of deciding what to do. Templates such as Push/Pull/Legs,
            Upper/Lower, and Full Body are a starting point you can edit. See{" "}
            <TextLink href={pages.trainingSplits.path}>training splits in IronBuddy</TextLink>,
            or the <TextLink href={pages.pushPullLegs.path}>Push Pull Legs guide</TextLink> for one
            popular split in detail.
          </p>
        </ContentSection>

        <ContentSection id="review-and-backup" title="Review and back up your log">
          <p>
            A log only helps if you look at it. Once a week, compare your best sets and total volume
            with recent weeks; the{" "}
            <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
            shows a simple routine.
          </p>
          <p>
            A log is also only useful if it survives a lost phone. Keep a backup. Turn on Google backup on your phone, and in the full version IronBuddy also saves an automatic JSON backup file in your Downloads folder and lets you export a copy whenever you like.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="How to log a workout in IronBuddy">
          <NumberedList>
            <li>Open a training day from the weekly view on the home screen.</li>
            <li>
              Review the day&apos;s exercises and add or remove exercises if today&apos;s session
              differs from the plan.
            </li>
            <li>Enter or adjust the reps and weight for each exercise.</li>
            <li>
              Choose whether the change applies to this date only or also updates your plan for
              later weeks.
            </li>
            <li>Tap Log workout to record it for that date.</li>
          </NumberedList>
          <p>
            Exercises without reps or weight are skipped, so an unfinished row does not clutter your
            history.
          </p>
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general information, not medical advice. If you have an injury or a health
            condition, speak to a qualified professional before changing your training.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks
          items={[pages.logTechniques, pages.progressiveOverload, pages.pushPullLegs, pages.guides]}
        />
      </PageBody>
    </main>
  );
}
