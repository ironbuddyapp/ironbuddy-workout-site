import type { Metadata } from "next";
import { BulletList, ContentSection, NumberedList, PageBody, Strong, TextLink } from "@/components/content";
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

export const metadata: Metadata = pageMetadata(pages.setTechniques);

const techniques = [
  ["Drop set", "After the main set, lower the weight and go again without rest. Each drop is logged with its own reps and weight."],
  ["Superset", "Two exercises back to back. Log the pairing on the set so the day reads the way you train it."],
  ["Rest-pause", "A set, a short pause of 10–20 seconds, then more reps with the same weight. Every pause chunk has its reps."],
  ["Pyramid", "Weight up and reps down from set to set, or the reverse. Each step is its own set."],
  ["Back-off set", "A lighter set after your heaviest work, logged at its own weight so the volume is right."],
  ["Myo-rep", "An activation set, then several short mini-sets with brief rests. Each mini-set is logged."],
  ["Cluster set", "One set split into clusters of a few reps with short rests inside the set."],
  ["Mechanical drop", "Switch to an easier variation of the movement when you can't do more, with the same weight."],
] as const;

const faqs: Faq[] = [
  {
    id: "volume",
    question: "Do drop sets and rest-pause reps count in my volume?",
    answer:
      "Yes. Every drop, pause chunk or mini-set has its own reps and weight, and all of them count toward the session's volume, the sets per muscle and the volume charts. A set you leave at zero reps and zero weight is skipped.",
  },
  {
    id: "plan",
    question: "Can I plan techniques ahead, not only log them?",
    answer:
      "Yes. Add a technique to a set from the day's Log button, or when you log a single exercise from its page, and it is saved with the day. If \"Also update my plan\" is on, it is planned for the same day in later weeks too.",
  },
  {
    id: "failure",
    question: "What is the \"Till failure\" switch?",
    answer:
      "A note on the set that you took it to failure. It is kept with the set and shown in the summary, and it does not change the numbers.",
  },
];

export default function SetTechniquesPage() {
  const crumbs = trail(pages.home, pages.features, pages.setTechniques);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.setTechniques, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Workout logging"
        title="Log drop sets, supersets, rest-pause and more, properly"
        updated={pages.setTechniques.modified}
        lead="Most gym logs stop at sets, reps and weight. IronBuddy logs the techniques lifters actually use, each with its own numbers: a drop set with every drop, a rest-pause set with every pause, a superset with its pairing. It all counts in your volume, your sets per muscle and your charts."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="logging" title="Every set: reps and weight, quickly" shot="logging">
          <p>
            Open a day from Home with its <Strong>Log</Strong> button, tap an exercise, and each set
            has reps and weight with <Strong>+</Strong> and <Strong>−</Strong> buttons. Add or
            remove sets, reorder exercises, add any of 800+ exercises, write a note for the exercise
            or the whole day, then <Strong>Log workout</Strong>. Today or any past date. Read{" "}
            <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>.
          </p>
        </FeatureBlock>

        <FeatureBlock id="techniques" title="Eight techniques, each with its own numbers" shot="techniques" flip>
          <p>
            Tap <Strong>+ add technique</Strong> under a set and pick one. A drop set gets a drop
            row with its own reps and weight; rest-pause gets its pause chunks; myo-reps their
            mini-sets. Nothing is approximated: what you lifted is what is logged.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <tbody>
                {techniques.map(([name, how]) => (
                  <tr key={name} className="border-t border-white/8 first:border-t-0">
                    <th scope="row" className="whitespace-nowrap px-4 py-2.5 text-left align-top font-medium text-white">{name}</th>
                    <td className="px-4 py-2.5">{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FeatureBlock>

        <ContentSection id="how-to" title="How to log a drop set">
          <NumberedList>
            <li>Open the day with its <Strong>Log</Strong> button and tap the exercise.</li>
            <li>Log the main set: reps and weight.</li>
            <li>Tap <Strong>+ add technique</Strong> under it and choose <Strong>Drop set</Strong>.</li>
            <li>Enter the drop&apos;s reps and weight. Add another drop if you did one.</li>
            <li>Tap <Strong>Log workout</Strong>. The summary shows the drop under the set, and the volume includes it.</li>
          </NumberedList>
        </ContentSection>

        <ContentSection id="more" title="More ways to log">
          <BulletList>
            <li>
              <Strong>Quick-log one exercise:</Strong> tap an exercise on today&apos;s day and{" "}
              <em>Log this exercise</em>, without opening the whole day.
            </li>
            <li>
              <Strong>This date only, or your plan too:</Strong> the &ldquo;Also update my plan&rdquo;
              switch decides whether a change sticks for the same day in later weeks.
            </li>
            <li>
              <Strong>Past dates:</Strong> log a workout for any day you missed; it lands in History
              in its place and the comparison uses the session before it.
            </li>
            <li>
              <Strong>PR notification:</Strong> when you save a heavier weight than ever before on an
              exercise, IronBuddy tells you. See the{" "}
              <TextLink href={pages.workoutSummary.path}>workout summary</TextLink>.
            </li>
            <li>
              <Strong>Offline:</Strong> logging never waits for a connection. See{" "}
              <TextLink href={pages.offline.path}>offline tracking</TextLink>.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="faq" title="Set technique questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.logTechniques, pages.logWorkouts, pages.workoutSummary, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
