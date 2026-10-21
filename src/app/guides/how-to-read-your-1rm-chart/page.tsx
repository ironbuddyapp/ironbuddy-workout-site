import type { Metadata } from "next";
import { BulletList, Callout, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.oneRmChart);

/** Epley, inverted: the share of a 1RM you can lift for a given number of reps. */
const percentages = [
  ["3", "91%", "Heavy strength work"],
  ["5", "86%", "Strength sets"],
  ["8", "79%", "Strength and size"],
  ["10", "75%", "Most hypertrophy work"],
  ["12", "71%", "Higher-rep sets; the formula's limit"],
] as const;

const faqs: Faq[] = [
  {
    id: "faq-1rm-dropped",
    question: "Why did my 1RM drop when I lifted the same weight?",
    answer:
      "Because you got fewer reps with it. The estimate uses weight and reps together: 80 kg for 10 estimates 106.7 kg, 80 kg for 8 estimates 101.3 kg. Same bar, fewer reps, lower number. One bad day is noise; three sessions in a row is a trend worth a look at sleep, food and the sets before that exercise.",
  },
  {
    id: "faq-1rm-13-reps",
    question: "I did 15 reps and the chart didn't move. Why?",
    answer:
      "The formula is only reliable up to about 12 reps, so IronBuddy counts any set above 12 as 12. Past that point, reps say more about endurance than about your maximum. If you want the chart to move, add weight and work in the 6–12 range.",
  },
  {
    id: "faq-1rm-accuracy",
    question: "How accurate is an estimated 1RM?",
    answer:
      "Within roughly 5 to 10 percent for most people on most lifts, better at low reps and on exercises you do often, worse on high reps, new exercises and machines with odd weight stacks. Treat it as a trend line and a planning tool, not a promise. Never attempt a heavy single because a chart says you can.",
  },
];

export default function OneRmChartGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.oneRmChart);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.oneRmChart, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · tracking"
        title="How to read your estimated 1RM chart"
        updated={pages.oneRmChart.modified}
        lead="A one-rep max, or 1RM, is the most you could lift once. You almost never test it, so a workout tracker estimates it from the sets you actually do. That estimate turns every session into one number per exercise, and the estimated 1RM chart plots it over months. This guide explains where the number comes from, why it moves the way it does, how to use it to pick your next weight, and when to ignore it."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Your estimated 1RM comes from the best set of each workout: weight × (1 + reps ÷ 30), the Epley formula.</li>
            <li>It rises when you add weight or reps at the same weight. It is capped at 12 reps, so high-rep sets don&apos;t move it.</li>
            <li>Read the trend over months, not the dots week to week. A dip after a break is normal.</li>
            <li>Use it to choose weights (10 reps ≈ 75% of your 1RM), never as a reason to test a heavy single.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What an estimated 1RM is">
          <p>
            Your true one-rep max changes with sleep, warm-up and nerves, and testing it is risky and
            tiring. An estimated 1RM is a formula applied to a normal set: if you lifted 80 kg for 10
            clean reps, how much could you probably lift once? Several formulas exist; IronBuddy uses{" "}
            <Strong>Epley</Strong>, the most common one: weight × (1 + reps ÷ 30).
          </p>
          <p>
            80 kg × (1 + 10 ÷ 30) = 80 × 1.333 = <Strong>106.7 kg</Strong>. Do 11 reps next week
            and it becomes 109.3 kg; add 2.5 kg and get 10 again, and it is 110 kg. Either kind of
            progress moves the same number, which is the whole point: it lets you compare a 6-rep day
            with a 10-rep day on one line.
          </p>
        </ContentSection>

        <ContentSection id="how-it-is-calculated" title="How IronBuddy calculates it">
          <BulletList>
            <li>
              <Strong>Best set of the workout.</Strong> Every set you logged with both a weight and reps
              is estimated, and the highest estimate is that session&apos;s point on the chart. The
              other sets don&apos;t pull it down.
            </li>
            <li>
              <Strong>Reps capped at 12.</Strong> A set of 15 or 20 is counted as 12. Above about 12 reps
              the formula overestimates, and the set says more about endurance than about strength.
            </li>
            <li>
              <Strong>Rounded to 0.1 kg (or lb).</Strong> Units follow your settings.
            </li>
            <li>
              <Strong>Per exercise.</Strong> A barbell bench press and a machine chest press are two
              different lines. Their numbers are not comparable, and neither is comparable with a
              friend&apos;s.
            </li>
            <li>
              <Strong>Drop sets and rest-pause count.</Strong> Each drop or pause chunk is a set with
              its own weight and reps, so a heavy first chunk can be the best set.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="reading-the-chart" title="Reading the chart">
          <p>
            Open <Strong>Progress → Exercises</Strong>, pick the exercise and tap <Strong>1RM</Strong>.
            The headline is your latest estimate and how much it changed over the range you picked:
            &ldquo;105 kg, ▲ +25 kg since you started&rdquo;. Under it, one point per session.
          </p>
          <BulletList>
            <li>
              <Strong>Zoom out.</Strong> On 1W or 1M the line is jagged, because every session is a
              different day. On 3M or 6M, IronBuddy groups sessions into weeks or months, and the shape
              is the truth: climbing, flat, or falling.
            </li>
            <li>
              <Strong>A plateau is a flat month, not a flat week.</Strong> Two or three sessions at the
              same number is normal. Six weeks flat on a lift you train twice a week is a plateau; change
              something (reps, exercise order, a back-off set, more food).
            </li>
            <li>
              <Strong>Dips after breaks are expected.</Strong> A holiday, an illness or a deload shows as
              a step down and a quick climb back. Don&apos;t read it as lost strength; read it as a
              reset.
            </li>
            <li>
              <Strong>Sudden jumps usually mean a form change.</Strong> A shorter range of motion, a
              bounce, a new seat height. If a jump feels too good, check the set, not the chart.
            </li>
            <li>
              <Strong>Compare with Best weight.</Strong> The Best weight chart only moves when you add
              load; the 1RM chart moves with reps too. If 1RM climbs while Best weight is flat, you are
              getting more reps and it is time to add weight.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="using-it" title="Using it to pick your next weight">
          <p>
            Because the formula links reps to a share of your max, you can turn it round: if your
            estimated 1RM on the leg press is 200 kg and the plan says 10 reps, start around 75% of
            that, 150 kg.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Share of your estimated 1RM you can lift for a given number of reps, from the Epley formula</caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-5">Reps</th>
                  <th scope="col" className="px-3 py-3 sm:px-5">About</th>
                  <th scope="col" className="px-3 py-3 sm:px-5">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {percentages.map(([reps, pct, use], index) => (
                  <tr key={reps} className={index !== percentages.length - 1 ? "border-b border-white/8" : undefined}>
                    <th scope="row" className="px-3 py-3 font-medium text-white sm:px-5">{reps}</th>
                    <td className="px-3 py-3 sm:px-5">{pct} of 1RM</td>
                    <td className="px-3 py-3 sm:px-5">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            These are averages; people differ, and so do exercises (most lifters get more reps at a
            given percentage on the leg press than on the bench press). Use the table for a starting
            weight on a new rep range, then let the log correct it. For the week-by-week method of
            adding weight and reps, read{" "}
            <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="when-to-doubt-it" title="When the number misleads">
          <BulletList>
            <li>
              <Strong>High-rep sets.</Strong> Anything over 12 reps is capped, and sets of 20 are not
              really about strength at all.
            </li>
            <li>
              <Strong>New exercises.</Strong> The first few sessions on a lift improve fast because you
              are learning it, not because you got that much stronger.
            </li>
            <li>
              <Strong>Machines with odd stacks.</Strong> Plate-loaded and selectorised machines differ
              between gyms; the same number means different things on different equipment.
            </li>
            <li>
              <Strong>Bodyweight exercises.</Strong> Pull-ups and push-ups logged without added weight
              have no load to estimate from, so they have no 1RM line. Log the added weight if you use a
              belt or vest.
            </li>
            <li>
              <Strong>Testing it.</Strong> An estimate is not a plan for a heavy single. If you want a
              true max, work up to it over weeks with a spotter, not because a chart said 110.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Where to find it in IronBuddy">
          <BulletList>
            <li>
              <Strong>Progress → Exercises → 1RM:</Strong> the chart, with ranges from 1W to All and a
              full-screen view. Tap ⓘ for the formula.
            </li>
            <li>
              <Strong>Exercise page:</Strong> your last workout as a table with the best set and its
              estimated 1RM, and your <Strong>best estimated 1RM</Strong> record with its date.
            </li>
            <li>
              <Strong>Workout summary:</Strong> a PR marker when a session sets a new heaviest weight;
              the 1RM record updates when a session&apos;s best set beats the old estimate.
            </li>
            <li>
              <Strong>Home:</Strong> the Personal records widget counts your records and the Exercise
              chart widget shows one lift&apos;s trend at a glance (in the full version, add one per
              lift).
            </li>
            <li>
              <Strong>Share (full version):</Strong> the share icon on the chart makes an image of it
              with the headline number and the change.
            </li>
          </BulletList>
          <p>
            See the <TextLink href={pages.progressCharts.path}>progress charts</TextLink> page for
            screenshots of all five chart types.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Estimated 1RM questions">
          <FaqList items={faqs} />
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. An estimated 1RM is a
            trend number, not permission to attempt a maximum lift; choose loads that suit your
            experience, and speak to a qualified professional if you have an injury or a health
            condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.progressiveOverload, pages.progressCharts, pages.workoutSummary, pages.setsPerWeek]} />
      </PageBody>
    </main>
  );
}
