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

export const metadata: Metadata = pageMetadata(pages.exerciseLibrary);

const faqs: Faq[] = [
  {
    id: "offline",
    question: "Does the exercise library work offline?",
    answer:
      "Yes. The exercises, their demonstrations, cues and muscle data ship with the app, so search, filters and every exercise page work with no signal and no account.",
  },
  {
    id: "custom",
    question: "Can I add my own exercises?",
    answer:
      "Yes. Create a custom exercise with its name and muscle group from the exercise picker. It sorts in with the rest, keeps its own records and charts, and is included in your exports.",
  },
  {
    id: "equipment",
    question: "Which equipment and muscle filters are there?",
    answer:
      "Muscles: Chest, Back, Traps, Legs, Shoulders, Biceps, Triceps, Forearms, Core and Full Body. Equipment: Barbell, Dumbbell, Machine, Bodyweight, Cable, Kettlebell, Band, Cardio and Other. You can combine them, and the active filters show as chips you can clear one by one.",
  },
];

export default function ExerciseLibraryPage() {
  const crumbs = trail(pages.home, pages.features, pages.exerciseLibrary);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.exerciseLibrary, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Exercise library"
        title="Exercise library app: 800+ exercises with demos, filters and your records"
        updated={pages.exerciseLibrary.modified}
        lead="IronBuddy is also an exercise library app, with more than 800 exercises, each with a demonstration, written cues and the muscles it targets. Search them, filter by muscle group and equipment, sort by the ones you did most recently, and open any exercise to see your last workout and your records next to the form demo. All of it works offline."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="library" title="Search, Recent, and sort" shot="library">
          <p>
            The library opens on a <Strong>Recent</Strong> section with the exercises you did
            lately and when (&ldquo;Yesterday&rdquo;, &ldquo;3 days ago&rdquo;), then the full
            list. Type a few letters to search (&ldquo;press&rdquo; finds every press), and sort{" "}
            <Strong>A–Z</Strong> or by <Strong>Recent</Strong>. Custom exercises sort in with the
            rest.
          </p>
        </FeatureBlock>

        <FeatureBlock id="filters" title="Filter by muscle and equipment" shot="filters" flip>
          <p>
            Tap <Strong>Filters</Strong> for two groups of chips. Muscle: Chest, Back, Traps, Legs,
            Shoulders, Biceps, Triceps, Forearms, Core, Full Body. Equipment: Barbell, Dumbbell,
            Machine, Bodyweight, Cable, Kettlebell, Band, Cardio, Other. Combine them (chest
            exercises on a machine, say), and the button shows how many results match before you
            apply it. The same filters are in the exercise picker when you add an exercise to a
            day.
          </p>
        </FeatureBlock>

        <FeatureBlock id="exercise-page" title="Every exercise, explained, with your numbers" shot="exercise">
          <p>
            An exercise page opens with the demonstration. Under it, <Strong>Last workout</Strong>{" "}
            as a table (date, the sets grouped by weight such as &ldquo;60 kg × 10, 10, 9&rdquo;,
            best set and estimated 1RM), then <Strong>Records</Strong> (heaviest weight, most reps,
            best session volume, best estimated 1RM, with dates), then <Strong>Target muscles</Strong>{" "}
            on a front and back body map, primary muscles solid and secondary faded, and finally
            how to do it.
          </p>
          <p>
            The same page opens wherever you tap an exercise: from Home, from a split, from the
            library or from the picker, and from Home you can <Strong>log this exercise</Strong> on
            its own without editing the whole day.
          </p>
        </FeatureBlock>

        <ContentSection id="data" title="Where the exercises come from">
          <BulletList>
            <li>
              The catalogue is based on free-exercise-db, an open exercise database, with IronBuddy&apos;s
              own corrections: for example rear-delt work shows on the back of the shoulders, presses on
              the front.
            </li>
            <li>
              Every exercise has its primary and secondary muscles, which drive{" "}
              <TextLink href={pages.muscleBalance.path}>Muscle Balance</TextLink> and the muscles
              worked on Home.
            </li>
            <li>
              Demonstrations are two-frame animations stored in the app, so they play without a
              connection.
            </li>
            <li>
              The credits are in the app under Settings → About → Credits &amp; Licenses.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="faq" title="Exercise library questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.trainingSplits, pages.setTechniques, pages.muscleBalance, pages.offline]} />
      </PageBody>
    </main>
  );
}
