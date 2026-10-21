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

export const metadata: Metadata = pageMetadata(pages.workoutSummary);

const faqs: Faq[] = [
  {
    id: "compared-to",
    question: "Which session is each exercise compared with?",
    answer:
      "The previous time you logged that exercise, whatever day it was on. The comparison looks at the best set: more weight shows as \"+2.5 kg\", more reps at the same weight as \"+2 reps\", and an identical best set as \"Same as last time\". An exercise you have never logged before says \"First time\".",
  },
  {
    id: "pr",
    question: "What counts as a personal record?",
    answer:
      "A new heaviest weight on an exercise. IronBuddy notifies you when you save a workout with one, marks the record set in the summary, and keeps every exercise's records: heaviest weight, most reps in a set, best session volume and best estimated 1RM, each with its date.",
  },
  {
    id: "past",
    question: "Can I open the summary of an old workout?",
    answer:
      "Yes. Every workout you have ever logged is in History, newest first, with its exercises, volume and records. Open any of them for the full summary, or delete it there if you mis-logged.",
  },
];

export default function WorkoutSummaryPage() {
  const crumbs = trail(pages.home, pages.features, pages.workoutSummary);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.workoutSummary, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Workout summary"
        title="Workout summary: see what improved since last time"
        updated={pages.workoutSummary.modified}
        lead="Progressive overload is simple to describe and easy to lose track of. IronBuddy's workout summary does the comparison for you: every exercise against the last time you did it, new personal records marked on the set that earned them, and the muscles you worked with the sets each one got."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="vs-last-time" title="Every exercise against your last session" shot="summary">
          <p>
            Open a workout in History and each exercise shows how it compares with the previous
            time you did it: <Strong>+2.5 kg</Strong> or <Strong>+2 reps</Strong> on your best set,{" "}
            <Strong>Same as last time</Strong>, or <Strong>First time</Strong> for a new exercise.
            The comparison is per exercise, not per day, so it still works when you move a lift
            between days or change your split.
          </p>
          <p>
            At the top, a date badge and the number of personal records in the session. Below each
            exercise, the sets as you logged them, with the record set marked.
          </p>
        </FeatureBlock>

        <FeatureBlock id="records" title="Personal records, kept per exercise" shot="records" flip>
          <p>
            When you save a workout with a heavier weight than ever before on an exercise, IronBuddy
            tells you at once. Every exercise page keeps four records with their dates:{" "}
            <Strong>heaviest weight</Strong>, <Strong>most reps in a set</Strong>,{" "}
            <Strong>best session volume</Strong> and <Strong>best estimated 1RM</Strong>. Home&apos;s
            Personal records widget counts them and lists the latest.
          </p>
          <p>
            In the full version, tapping a PR marker opens that record as a{" "}
            <TextLink href={pages.shareCards.path}>share card</TextLink>: &ldquo;105 kg × 12,
            +25 kg since Jul 2026&rdquo;.
          </p>
        </FeatureBlock>

        <ContentSection id="muscles" title="Muscles worked and volume per muscle">
          <p>
            The summary ends with the body map for the whole workout, main muscles solid and helper
            muscles faded, and the working sets per muscle. It is the same counting rule as{" "}
            <TextLink href={pages.muscleBalance.path}>Muscle Balance</TextLink>: every set you
            marked done counts once, for the exercise&apos;s main muscle.
          </p>
          <BulletList>
            <li>Total volume (sets × reps × weight) and the number of sets for the session</li>
            <li>The muscles trained, on a front and back body map</li>
            <li>Working sets per muscle, as a list</li>
            <li>A Share button (full version) for the workout card or any PR card</li>
          </BulletList>
        </ContentSection>

        <ContentSection id="history" title="History: every workout you've logged">
          <p>
            The History tab lists every session newest first, with its name, date, number of
            exercises, volume and records. Logging a past date puts the workout where it belongs,
            and the comparison uses the session before it. Nothing is ever sent anywhere: your
            history is stored on your phone and works{" "}
            <TextLink href={pages.offline.path}>offline</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Workout summary questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.progressCharts, pages.muscleBalance, pages.progressiveOverload, pages.shareCards]} />
      </PageBody>
    </main>
  );
}
