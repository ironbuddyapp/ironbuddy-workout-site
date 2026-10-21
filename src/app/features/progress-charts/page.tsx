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

export const metadata: Metadata = pageMetadata(pages.progressCharts);

const faqs: Faq[] = [
  {
    id: "1rm",
    question: "How is the 1RM calculated?",
    answer:
      "With the Epley formula, weight × (1 + reps ÷ 30), applied to the best set of each workout. Sets of more than 12 reps are counted as 12, where the formula stops being reliable. It is an estimate for tracking your trend, not a measured max: don't attempt a heavy single because a chart says you can.",
  },
  {
    id: "ranges",
    question: "How far back do the charts go?",
    answer:
      "As far as your log. Pick 1W, 1M, 3M, 6M, 1Y or All under any chart. With months or years of history the sessions are grouped into weeks or months so the line stays readable, and the headline number always shows the change over the range you picked.",
  },
  {
    id: "body-data",
    question: "Where do body weight and body fat come from?",
    answer:
      "From entries you log yourself in Settings → Body Tracking, whenever you like. Both are optional. They are charted on the Body tab over the same time ranges as your training.",
  },
];

export default function ProgressChartsPage() {
  const crumbs = trail(pages.home, pages.features, pages.progressCharts);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.progressCharts, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Progress charts"
        title="Strength progress charts: best weight, 1RM, volume and reps"
        updated={pages.progressCharts.modified}
        lead="The Progress tab turns your log into strength progress charts you can read at a glance: a headline number, how much it changed over the range, and a clean line under it. Three views cover your whole training: Workouts for volume, Exercises for every lift you track, and Body for weight and body fat."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="exercises" title="Five charts for every exercise" shot="strength">
          <p>
            Pick any exercise you have logged and switch between <Strong>Best weight</Strong>,{" "}
            <Strong>1RM</Strong>, <Strong>Weight vs Reps</Strong> (two lines on one chart),{" "}
            <Strong>Volume</Strong> and <Strong>Reps</Strong>. The headline says where you are now
            and how far you have come: &ldquo;105 kg, ▲ +25 kg since you started&rdquo;.
          </p>
          <p>
            The estimated 1RM uses the Epley formula on the best set of each workout, so it moves
            when you lift heavier or get more reps at the same weight. Read{" "}
            <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>{" "}
            for a simple weekly routine built around these charts.
          </p>
        </FeatureBlock>

        <FeatureBlock id="workouts" title="Training volume over time" shot="progress" flip>
          <p>
            The Workouts view charts your total volume (sets × reps × weight) per session and the
            average per workout. A dip after a deload or a holiday, a climb when your split starts
            working: the whole story of your training in one line.
          </p>
          <p>
            Every chart has a share icon (full version) and a full-screen button in its title row,
            and one even time-range bar under it: <Strong>1W · 1M · 3M · 6M · 1Y · All</Strong>.
          </p>
        </FeatureBlock>

        <FeatureBlock id="body" title="Body weight and body fat" shot="metrics">
          <p>
            Log your body weight and body fat percentage in Settings whenever you want, and the Body
            view charts both over the same ranges as your lifts. The Home widget shows your latest
            weight and its trend. Both are optional: track what is useful to you and nothing else.
          </p>
        </FeatureBlock>

        <ContentSection id="records-and-home" title="Records, Home widgets and the exercise page">
          <BulletList>
            <li>
              <Strong>Records:</Strong> every exercise keeps its heaviest weight, most reps in a
              set, best session volume and best estimated 1RM, with dates. See the{" "}
              <TextLink href={pages.workoutSummary.path}>workout summary</TextLink>.
            </li>
            <li>
              <Strong>Exercise chart widget:</Strong> Home shows the best-weight trend of one exercise
              at a glance; in the full version you can add a widget for every exercise you care
              about and make it as big as you like. See{" "}
              <TextLink href={pages.customizableHome.path}>Customizable Home</TextLink>.
            </li>
            <li>
              <Strong>Exercise page:</Strong> your last workout as a table (sets grouped by weight,
              best set, estimated 1RM) and your records, under the form demo.
            </li>
            <li>
              <Strong>Full screen:</Strong> any chart, as big as your phone, in either orientation.
            </li>
          </BulletList>
          <p>
            Everything is computed on your phone from your own log. There is no account and nothing
            is uploaded, so the charts work{" "}
            <TextLink href={pages.offline.path}>offline</TextLink> like the rest of the app.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Progress chart questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.oneRmChart, pages.workoutSummary, pages.progressiveOverload, pages.customizableHome]} />
      </PageBody>
    </main>
  );
}
