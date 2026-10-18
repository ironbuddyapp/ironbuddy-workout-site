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

export const metadata: Metadata = pageMetadata(pages.progressiveOverload);

/** An illustration of double progression. The numbers are an example, not a prescription. */
const example = [
  { session: "1", weight: "60 kg", reps: "8, 8, 8", next: "Aim for one more rep" },
  { session: "2", weight: "60 kg", reps: "9, 8, 8", next: "Keep adding reps" },
  { session: "3", weight: "60 kg", reps: "10, 10, 9", next: "Keep adding reps" },
  { session: "4", weight: "60 kg", reps: "12, 12, 12", next: "Top of the range on every set: add weight" },
  { session: "5", weight: "62.5 kg", reps: "9, 8, 8", next: "Start climbing the range again" },
];

export default function ProgressiveOverloadGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.progressiveOverload);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.progressiveOverload, { trail: crumbs, article: true })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide"
        title="How to track progressive overload"
        updated={pages.progressiveOverload.modified}
        lead="Progressive overload means gradually asking your body to do more over time, and tracking it means recording enough of each workout to see that you are. The simplest method is to log weight, reps, and sets for every exercise, then compare this week with the last few."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>
              Progressive overload is doing slightly more over time: more weight, more reps, more
              sets, or better-quality reps.
            </li>
            <li>You cannot see overload without a log. Record weight, reps, and sets every time.</li>
            <li>
              Change one thing at a time. Double progression, adding reps first and then weight, is
              an easy default.
            </li>
            <li>Review weekly, and look at total volume and your best sets, not a single day.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-means" title="What progressive overload means">
          <p>
            Progressive overload is the principle of gradually increasing the demand you place on
            your muscles so they keep adapting. In the gym that usually means lifting a little more
            weight, doing a few more reps, adding a set, or performing the same reps with better
            control and range of motion than before.
          </p>
          <p>
            The key word is gradually. Small, repeatable increases add up, while big jumps tend to
            break form or stall.
          </p>
        </ContentSection>

        <ContentSection id="ways-to-progress" title="Ways to progress a lift">
          <BulletList>
            <li>
              <Strong>Add weight:</Strong> use the smallest increment your equipment allows, for
              example 2.5 kg (5 lb), once the target reps are clean.
            </li>
            <li>
              <Strong>Add reps:</Strong> keep the weight and aim for one or two more reps per set.
            </li>
            <li>
              <Strong>Add sets:</Strong> one more work set for a muscle group, if your recovery
              allows it.
            </li>
            <li>
              <Strong>Improve quality:</Strong> the same weight and reps with a fuller range of
              motion, a pause, or a slower lowering phase.
            </li>
            <li>
              <Strong>Reduce rest:</Strong> the same work in less time.
            </li>
          </BulletList>
          <p>
            Pick one variable per exercise per session. If you change weight, reps, and sets at
            once, you cannot tell what worked.
          </p>
        </ContentSection>

        <ContentSection id="what-to-log" title="What to log so overload is visible">
          <p>For every exercise, record:</p>
          <BulletList>
            <li>The date</li>
            <li>The weight used</li>
            <li>The reps you completed in each set</li>
            <li>The number of sets</li>
            <li>
              A short note when something changes how the set should be judged, such as a new grip,
              a pause, poor sleep, or pain
            </li>
          </BulletList>
          <p>
            Body weight is optional, but it is useful when your strength relative to your size
            matters to your goal. For more on what belongs in a log, see{" "}
            <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="double-progression" title="A simple method: double progression">
          <p>
            Double progression uses a rep range instead of a single target. Choose a range such as
            8 to 12 reps and start at a weight where you can reach the bottom of it. Each session,
            try to add a rep. When you reach the top of the range on every set, add the smallest
            weight increment and start again near the bottom.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Example of double progression on a bench press: three sets with a target of 8 to 12
                reps
              </caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Session
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Weight
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-6">
                    Reps per set
                  </th>
                  <th scope="col" className="hidden px-4 py-3 sm:table-cell sm:px-6">
                    Next step
                  </th>
                </tr>
              </thead>
              <tbody>
                {example.map((row, index) => (
                  <tr
                    key={row.session}
                    className={index !== example.length - 1 ? "border-b border-white/8" : undefined}
                  >
                    <th scope="row" className="px-3 py-3 font-medium text-white sm:px-6">
                      {row.session}
                    </th>
                    <td className="px-3 py-3 sm:px-6">{row.weight}</td>
                    <td className="px-3 py-3 sm:px-6">{row.reps}</td>
                    <td className="hidden px-4 py-3 sm:table-cell sm:px-6">{row.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            In session 4 every set reaches the top of the range, so session 5 adds the smallest
            weight increment and starts near the bottom of the range again. This is an illustration,
            not a prescription: progress is usually slower than this, and smaller weight jumps are
            fine.
          </p>
        </ContentSection>

        <ContentSection id="volume-and-1rm" title="Reading volume and 1RM">
          <p>
            <Strong>Training volume</Strong> is commonly calculated as sets × reps × weight. Three
            sets of 8 reps at 60 kg is 1,440 kg of volume. If volume for an exercise rises over
            several weeks while your form holds up, you are doing more work.
          </p>
          <p>
            <Strong>1RM</Strong> (one-rep max), calculated with the Epley formula, predicts the heaviest single rep you could lift, based on
            a heavier set of several reps. One widely used formula, Epley, multiplies the weight by
            (1 + reps ÷ 30), so 60 kg for 8 reps comes out at about 76 kg. IronBuddy uses Epley.
            Other apps may use other formulas, and estimates get less reliable at high reps, so
            treat the number as a trend line, not a promise.
          </p>
          <p>Compare like with like: the same exercise, across several weeks.</p>
        </ContentSection>

        <ContentSection id="weekly-review" title="A five-minute weekly review">
          <NumberedList>
            <li>Open your log for each main lift.</li>
            <li>
              Compare this week&apos;s best set and total volume with the last two or three weeks.
            </li>
            <li>Mark each lift as improved, held steady, or dropped.</li>
            <li>
              Choose one variable to change next week for each lift: reps, weight, or sets.
            </li>
            <li>Write a note on anything unusual, such as poor sleep, a new grip, or pain.</li>
          </NumberedList>
        </ContentSection>

        <ContentSection id="stalls" title="When progress stalls">
          <p>
            Progress is not a straight line. If a lift has not improved for three or four weeks,
            check the basics first: sleep, food, stress, and whether your form and range of motion
            have stayed consistent. Then consider a lighter week, a small change to the rep range,
            or a different variation of the lift.
          </p>
          <p>
            If something hurts rather than just feels hard, stop and speak to a qualified
            professional.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="How to track progressive overload in IronBuddy">
          <BulletList>
            <li>
              Log every set with its weight and reps. IronBuddy also has a notes field for context.
            </li>
            <li>
              Open Progress, then Workouts, to see total and average workout volume; in Exercises,
              pick an exercise and choose Volume to see its volume over time.
            </li>
            <li>
              Open Progress, then Exercises, and choose 1RM to follow it. IronBuddy works it out
              with the Epley formula from the best completed set of each workout, counting sets of
              more than 12 reps as 12.
            </li>
            <li>
              Watch for the PR notification when you save a workout: it appears when you lift a
              heavier weight than you have logged before for that exercise.
            </li>
            <li>
              Choose 1M or 3M to look at a few weeks at a time, or All to see the whole picture.
            </li>
            <li>
              Use the weekly view on the home screen to see which planned days you completed in
              full, completed in part, or missed.
            </li>
          </BulletList>
          <p>
            See every screen in the{" "}
            <TextLink href={pages.features.path}>IronBuddy feature tour</TextLink>.
          </p>
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Choose loads and
            progressions that suit your experience, and speak to a qualified professional if you have
            an injury or a health condition. IronBuddy is a logging tool, not a medical device.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.oneRmChart, pages.setsPerWeek, pages.logWorkouts, pages.guides]} />
      </PageBody>
    </main>
  );
}
