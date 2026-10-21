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

export const metadata: Metadata = pageMetadata(pages.trainingSplits);

/** In the app's order: Advanced first, Beginner last (levels from published program guides). */
const presets = [
  ["Arnold Split (6×)", "6 days", "Advanced"],
  ["PHAT", "5 days", "Advanced"],
  ["Push / Pull / Legs (6×)", "6 days", "Intermediate"],
  ["Bro Split (5×)", "5 days", "Intermediate"],
  ["PHUL", "4 days", "Intermediate"],
  ["5/3/1 (BBB)", "3 days", "Intermediate"],
  ["Push / Pull (2×)", "4 days", "Intermediate"],
  ["Push / Pull / Legs (3×)", "3 days", "Beginner"],
  ["Full Body 3×", "3 days", "Beginner"],
  ["Upper / Lower", "4 days", "Beginner"],
] as const;

const faqs: Faq[] = [
  {
    id: "edit-preset",
    question: "Can I change a preset split?",
    answer:
      "Yes. Editing any day of a preset creates your own editable copy under My splits, marked \"From preset\", and the original stays in Presets. Change exercises, sets and notes, add or remove days, and make it active.",
  },
  {
    id: "weekdays",
    question: "How do I put the split on my week?",
    answer:
      "Edit Week maps each split day to a weekday, with rest days in between; it changes every week from then on. Change Day swaps a single date for another split day, a custom day or a rest day without touching the schedule.",
  },
  {
    id: "pdf",
    question: "Can I print my split?",
    answer:
      "Yes. Settings → Split plan PDF saves or shares a PDF of your active split with every day's exercises and sets. That works in the trial and the full version.",
  },
];

export default function TrainingSplitsPage() {
  const crumbs = trail(pages.home, pages.features, pages.trainingSplits);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.trainingSplits, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Training splits"
        title="Workout split planner: ten ready-made splits, or build your own"
        updated={pages.trainingSplits.modified}
        lead="A split is the plan behind your week: which muscles on which days. As a workout split planner, IronBuddy comes with ten presets, from a three-day Full Body to a six-day Arnold split, each with exercises, rep ranges and rest times. Filter them by days a week and level, make one active, edit any day, or start from scratch with your own."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="presets" title="The ten presets" shot="presets">
          <p>
            Every preset is written with machines and dumbbells, in the 10–15 rep range for most
            work. Each exercise carries its rep range and
            rest time as a note, such as &ldquo;10–12 reps · Rest 2:00&rdquo;, so the plan is on the
            day itself. Each one shows its <Strong>level</Strong>, Beginner, Intermediate or Advanced,
            taken from published program guides, and the list runs from Advanced to Beginner.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-2.5">Split</th>
                  <th className="px-4 py-2.5">Days a week</th>
                  <th className="px-4 py-2.5">Level</th>
                </tr>
              </thead>
              <tbody>
                {presets.map(([name, days, level]) => (
                  <tr key={name} className="border-t border-white/8">
                    <td className="px-4 py-2 font-medium text-white">{name}</td>
                    <td className="px-4 py-2">{days}</td>
                    <td className="px-4 py-2">{level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FeatureBlock>

        <FeatureBlock id="filters" title="Find the right one: days, style, level" shot="splits" flip>
          <p>
            The Splits tab has two lists: <Strong>My splits</Strong> (your own and your edited
            copies of presets) and <Strong>Presets</Strong>. Filter the presets by days a week,
            style (Push/Pull/Legs, Upper/Lower, full body, body-part) and level, and
            the button tells you how many match before you apply it. Tap a day to see its
            exercises, sets and notes.
          </p>
          <p>
            Running PPL? Read{" "}
            <TextLink href={pages.pushPullLegs.path}>how to plan and track a Push Pull Legs split</TextLink>.
          </p>
        </FeatureBlock>

        <FeatureBlock id="your-week" title="Your split on your week" shot="dashboard">
          <p>
            Home shows the week with each day&apos;s status: logged, partly logged or missed, and a
            missed workout can move to the next free day in one tap. <Strong>Edit
            Week</Strong> maps your split days to weekdays for every week to come; <Strong>Change
            Day</Strong> swaps one date for another split day, a custom day or a rest day. Every
            workout counts toward the week, planned or not, so a 3-day split trained four times
            reads &ldquo;4 of 4&rdquo;.
          </p>
        </FeatureBlock>

        <ContentSection id="your-own" title="Build your own split">
          <BulletList>
            <li>
              <Strong>New split:</Strong> name it, pick the number of days, and make it active if you
              like. Add exercises to each day from the library, with sets, reps, weight and notes.
            </li>
            <li>
              <Strong>From a preset:</Strong> edit any day of a preset and you get your own copy to
              change freely.
            </li>
            <li>
              <Strong>Per day:</Strong> drag exercises into the order you train them, add set
              techniques, write a day note that shows every time the day comes up.
            </li>
            <li>
              <Strong>When you log:</Strong> &ldquo;Also update my plan&rdquo; decides whether a
              change applies to that date only or to the same day in later weeks. See{" "}
              <TextLink href={pages.setTechniques.path}>logging and set techniques</TextLink>.
            </li>
            <li>
              <Strong>Share it:</Strong> a PDF of your active split from Settings, in any version.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="guides" title="A guide to each preset">
          <p>
            Each preset has a guide that explains the split, lists every day with its exercises, shows
            ways to lay out the week and how to track it in IronBuddy.
          </p>
          <RelatedLinks
            id="split-guides"
            title="Training split guides"
            items={[
              pages.fullBody,
              pages.upperLower,
              pages.pushPullLegs,
              pages.phul,
              pages.phat,
              pages.broSplit,
              pages.arnoldSplit,
              pages.fiveThreeOne,
            ]}
          />
        </ContentSection>

        <ContentSection id="faq" title="Training split questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.pushPullLegs, pages.setTechniques, pages.exerciseLibrary, pages.logWorkouts]} />
      </PageBody>
    </main>
  );
}
