import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { FeatureBlock } from "@/components/FeatureBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.muscleBalance);

const faqs: Faq[] = [
  {
    id: "counting",
    question: "How does IronBuddy count sets per muscle group?",
    answer:
      "Every set you mark done counts once, for the main muscle of the exercise. A bench press counts for Chest, not for Arms or Shoulders; a squat counts for Legs. Sets with no reps and no weight are skipped. The six areas are Chest, Shoulders, Arms, Core, Legs and Back.",
  },
  {
    id: "week",
    question: "Which week does Muscle Balance show?",
    answer:
      "The current calendar week, the same one the calendar on Home shows, against the week before it. Every workout you logged counts, planned or not, so an extra session on a rest day is included.",
  },
  {
    id: "vs-muscles-worked",
    question: "What is the difference between Muscles worked and Muscle Balance?",
    answer:
      "Muscles worked (the body map on Home) shows which muscles you trained this week, all in the same colour, however many sets. Muscle Balance shows how much: the number of working sets per body area and how it compares with last week.",
  },
];

export default function MuscleBalancePage() {
  const crumbs = trail(pages.home, pages.features, pages.muscleBalance);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.muscleBalance, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Muscle Balance"
        title="Muscle Balance tracker: sets per muscle group each week, and what you skipped"
        updated={pages.muscleBalance.modified}
        lead="The Muscle Balance tracker is a widget on IronBuddy's Home. It counts your working sets this week for six body areas, draws them as a shape against last week's, and names the areas you haven't trained yet. Together with the Muscles worked body map, it answers two questions every lifter has: what did I train this week, and did I miss anything?"
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="chart" title="Six areas, this week against last week" shot="balance">
          <p>
            The chart has six points: <Strong>Chest, Shoulders, Arms, Core, Legs and Back</Strong>.
            This week is the green shape, last week the dashed outline, so a dent shows an area
            that got less than usual. Next to each area is its number of working sets, in red when it
            is zero.
          </p>
          <p>
            Beside the chart are both weeks&apos; totals, the change (&ldquo;▲ 4 more sets&rdquo;),
            and the line that matters most: <Strong>&ldquo;Not trained yet: Core, Legs&rdquo;</Strong>,
            or &ldquo;Every area trained this week&rdquo; once you have covered them all.
          </p>
        </FeatureBlock>

        <FeatureBlock id="how-it-counts" title="How the sets are counted" shot="balanceExplained" flip>
          <p>
            Tap ⓘ on the widget and it explains itself. Every set you mark done counts once, for the
            main muscle of the exercise: a bench press counts for Chest, a lat pulldown for Back, a
            leg press for Legs. Helper muscles don&apos;t add sets, so nothing is counted twice and the
            totals stay honest.
          </p>
          <p>
            Research on hypertrophy usually points to roughly 10 to 20 working sets per muscle group
            per week. IronBuddy doesn&apos;t set a target for you; it shows your real numbers so you
            can judge them against whatever programme you follow. Read{" "}
            <TextLink href={pages.setsPerWeek.path}>how many sets per muscle group per week</TextLink>{" "}
            for what the research suggests and how to count.
          </p>
        </FeatureBlock>

        <FeatureBlock id="muscles-worked" title="Muscles worked: every muscle you trained, on a body map" shot="dashboard">
          <p>
            The first widget on Home is a front and back body drawing. Every muscle you trained this
            week lights up in the same strong colour. It is a picture of coverage, not of volume, so a single set of curls lights the
            biceps just as a full arm day does.
          </p>
          <p>
            Hip and leg compounds count for the glutes too: squats, deadlifts, Romanian deadlifts,
            lunges, leg press and back extensions light the glutes along with their main muscle,
            while leg extensions and leg curls don&apos;t.
          </p>
        </FeatureBlock>

        <ContentSection id="elsewhere" title="Muscles elsewhere in the app">
          <BulletList>
            <li>
              <Strong>Workout summary:</Strong> after each session, the body map for that workout
              and the working sets per muscle. See the{" "}
              <TextLink href={pages.workoutSummary.path}>workout summary</TextLink>.
            </li>
            <li>
              <Strong>Exercise pages:</Strong> the target muscles of any exercise, primary ones solid
              and secondary ones faded, on the same body map. See the{" "}
              <TextLink href={pages.exerciseLibrary.path}>exercise library</TextLink>.
            </li>
            <li>
              <Strong>Volume per muscle:</Strong> a widget on Home that lists your working sets per
              muscle this week as bars.
            </li>
            <li>
              <Strong>Share:</Strong> in the full version, the workout card you share includes the
              muscles you worked.
            </li>
          </BulletList>
          <p>
            Every catalogue exercise carries its primary and secondary muscles; custom exercises use
            the muscle group you give them. Rear-delt work (reverse flyes, face pulls, rear-delt
            raises) shows on the back of the shoulders, presses on the front.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Muscle Balance questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.setsPerWeek, pages.workoutSummary, pages.customizableHome, pages.progressCharts]} />
      </PageBody>
    </main>
  );
}
