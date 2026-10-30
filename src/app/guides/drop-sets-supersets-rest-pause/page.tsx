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
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.logTechniques);

const techniques = [
  {
    name: "Drop set",
    how: "Finish a set, lower the weight by 20–30% at once, and keep going without rest. One or two drops is plenty.",
    bestFor: "Isolation and machine exercises at the end of a session: lateral raises, curls, pushdowns, leg extensions.",
    log: "The main set, then each drop as its own row with its reps and weight.",
  },
  {
    name: "Superset",
    how: "Two exercises back to back with no rest between them, then rest. Pair opposite muscles (biceps and triceps, chest and back) or two exercises for the same muscle.",
    bestFor: "Saving time, and arm or shoulder work where the pump is part of the point.",
    log: "The pairing on the set, with each exercise's reps and weight as normal.",
  },
  {
    name: "Rest-pause",
    how: "Take a set close to failure, rack it, rest 10–20 seconds, do a few more reps with the same weight, and repeat once or twice.",
    bestFor: "Getting more quality reps at a heavy weight on a machine or dumbbell exercise, in less time than extra straight sets.",
    log: "The first set, then each pause chunk with its reps at the same weight.",
  },
] as const;

const others = [
  ["Pyramid", "Weight up and reps down from set to set (or the reverse). Each step is a normal set."],
  ["Back-off set", "A lighter set after your heaviest work, usually for more reps. Log it at its own weight."],
  ["Myo-reps", "An activation set of 12–20, then several mini-sets of 3–5 with a few breaths' rest. Each mini-set is logged."],
  ["Cluster set", "One set broken into clusters of 2–3 reps with 10–20 seconds between, so you can use a heavier weight."],
  ["Mechanical drop", "When you cannot do another rep, switch to an easier variation (incline push-up after push-ups) with the same weight."],
] as const;

const faqs: Faq[] = [
  {
    id: "faq-techniques-more-muscle",
    question: "Do drop sets build more muscle than straight sets?",
    answer:
      "Not for the same number of hard sets, as far as the research goes: when volume and effort are matched, drop sets and straight sets grow muscle about the same. What drop sets do is pack more hard work into less time. Use them for that, not because they are magic.",
  },
  {
    id: "faq-techniques-how-often",
    question: "How often should I use these techniques?",
    answer:
      "On the last set of an exercise, on one or two exercises per session, and not every week. They are tiring, and the fatigue carries into the next day. IronBuddy's presets suggest them as optional extras (a drop set on the last set now and then, biceps and triceps as supersets now and then) for exactly that reason.",
  },
  {
    id: "faq-techniques-compounds",
    question: "Can I do drop sets on squats or deadlifts?",
    answer:
      "You can, but it is a poor trade. Form on heavy compounds goes first when you are exhausted, and that is when drop sets happen. Keep squats, deadlifts and presses as straight sets and save the techniques for machines, cables and dumbbells, where a sloppy last rep costs nothing.",
  },
];

export default function TechniquesGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.logTechniques);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.logTechniques, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training"
        title="Rest-pause sets, drop sets and supersets: how to do and log them"
        updated={pages.logTechniques.modified}
        lead="Drop sets, supersets and rest-pause sets are ways of getting more work out of a set than one straight set gives you. Used on the right exercises, at the right time, they save minutes and add hard reps. Used everywhere, they wreck your recovery and your log. This guide explains each one, when it helps, and how to record it so your numbers still mean something."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>A drop set extends a set by lowering the weight; a superset pairs two exercises; rest-pause splits a set with short pauses.</li>
            <li>They add hard reps in less time, not more muscle per hard rep. Use them for time and intensity, on machines and isolation work.</li>
            <li>Keep them to the last set of an exercise, one or two exercises a session, and not every week.</li>
            <li>Log every drop, pause chunk and paired exercise with its own reps and weight, so your volume and sets per muscle are right.</li>
          </BulletList>
        </Callout>

        <ContentSection id="the-three" title="The three techniques most lifters use">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Drop sets, supersets and rest-pause: how to do each, what it is best for, and how to log it</caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-5">Technique</th>
                  <th scope="col" className="px-3 py-3 sm:px-5">How</th>
                  <th scope="col" className="hidden px-3 py-3 sm:table-cell sm:px-5">Best for</th>
                  <th scope="col" className="hidden px-3 py-3 md:table-cell md:px-5">Log it as</th>
                </tr>
              </thead>
              <tbody>
                {techniques.map((t, index) => (
                  <tr key={t.name} className={index !== techniques.length - 1 ? "border-b border-white/8" : undefined}>
                    <th scope="row" className="px-3 py-3 align-top font-medium text-white sm:px-5">{t.name}</th>
                    <td className="px-3 py-3 align-top leading-relaxed sm:px-5">{t.how}</td>
                    <td className="hidden px-3 py-3 align-top leading-relaxed sm:table-cell sm:px-5">{t.bestFor}</td>
                    <td className="hidden px-3 py-3 align-top leading-relaxed md:table-cell md:px-5">{t.log}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentSection>

        <ContentSection id="drop-sets" title="Drop sets">
          <p>
            A drop set is a set that does not end when you fail. You finish your reps, take 20 to 30
            percent off the weight at once, and keep going until you are close to failure again. One
            drop is the usual version; two is a lot; three is a party trick. The point is that the
            muscle keeps working past the point where the original weight stopped it.
          </p>
          <BulletList>
            <li>
              <Strong>Where:</Strong> machines, cables and dumbbells, where changing the weight takes a
              second and a sloppy last rep is harmless. Lateral raises, curls, pushdowns, leg extensions,
              pec deck.
            </li>
            <li>
              <Strong>When:</Strong> the last set of an exercise. Doing it on every set means the later
              sets are done exhausted, and the quality drops.
            </li>
            <li>
              <Strong>Logging:</Strong> the main set as normal, then each drop as its own row with the
              lower weight and the reps you got. Both count toward your volume, because both were work.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="supersets" title="Supersets">
          <p>
            A superset is two exercises done back to back, then a rest. The common versions pair
            opposite muscles (a curl and a pushdown, a row and a press), or two exercises for the same
            muscle (a fly straight into a press). Opposite-muscle supersets cost you almost nothing in
            performance and halve your rest time; same-muscle supersets are a way to pile fatigue onto
            one area.
          </p>
          <BulletList>
            <li>
              <Strong>Where:</Strong> arms, shoulders and any session where you are short of time. Two
              stations next to each other help; a busy gym does not.
            </li>
            <li>
              <Strong>When:</Strong> whenever. Opposite-muscle supersets are the one technique you can
              run every week without much cost. The Arnold split pairs biceps and triceps this way.
            </li>
            <li>
              <Strong>Logging:</Strong> each exercise with its own sets, reps and weight, plus a note
              that they were paired. The pairing matters when you compare with last time: 10 curls
              straight after 10 pushdowns is not the same as 10 fresh curls.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="rest-pause" title="Rest-pause sets">
          <p>
            Rest-pause takes one heavy set and stretches it with short breaks. Do your reps to a rep
            or two from failure, rack the weight, rest 10 to 20 seconds, and do as many more as you can
            with the same weight. Repeat once or twice. Something like 10, then 4, then 3 is typical.
            You end up with 17 reps at a weight you could only do 10 straight, in about a minute more.
          </p>
          <BulletList>
            <li>
              <Strong>Where:</Strong> machines and dumbbells. Anything where you can set the weight down
              safely and pick it up again without a spotter.
            </li>
            <li>
              <Strong>When:</Strong> the last set of a main exercise on a day you have energy. It is the
              most demanding of the three.
            </li>
            <li>
              <Strong>Logging:</Strong> the first set, then each pause chunk with its reps. Same weight
              every time, so if the weight changes it was a drop set, not rest-pause.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="others" title="Five more worth knowing">
          <ul className="space-y-3">
            {others.map(([name, how]) => (
              <li key={name} className="rounded-2xl border border-white/8 bg-surface p-5">
                <h3 className="text-base font-semibold tracking-tight text-white">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{how}</p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection id="rules" title="Four rules that keep them useful">
          <NumberedList>
            <li>
              <Strong>Last set only.</Strong> Everything before it is straight sets at full quality.
            </li>
            <li>
              <Strong>Isolation and machines, not heavy compounds.</Strong> Squats, deadlifts and barbell
              presses stay straight; fatigue is when form goes.
            </li>
            <li>
              <Strong>One or two exercises per session.</Strong> More than that and tomorrow&apos;s
              session pays for it.
            </li>
            <li>
              <Strong>Log the whole thing.</Strong> Reps and weight for every drop, chunk and paired
              exercise. A drop set logged as &ldquo;one set&rdquo; makes your volume look lower than it
              was and your progress look flatter than it is.
            </li>
          </NumberedList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Logging them in IronBuddy">
          <p>
            IronBuddy logs all eight techniques, each with its own numbers. Open a day with its{" "}
            <Strong>Log</Strong> button, tap the exercise, and under a set tap{" "}
            <Strong>+ add technique</Strong>.
          </p>
          <BulletList>
            <li>
              <Strong>Drop set:</Strong> a drop row appears under the set with its own reps and weight;
              add another for a second drop.
            </li>
            <li>
              <Strong>Rest-pause:</Strong> each pause chunk gets its reps at the set&apos;s weight.
            </li>
            <li>
              <Strong>Superset:</Strong> the pairing is kept on the set, so the day reads the way you
              trained it.
            </li>
            <li>
              <Strong>Till failure:</Strong> a switch on any set that notes you took it to failure,
              without changing the numbers.
            </li>
            <li>
              <Strong>It all counts:</Strong> every drop, chunk and mini-set adds to the session volume,
              the sets per muscle in Muscle Balance, and the volume charts.
            </li>
            <li>
              <Strong>Plan it:</Strong> with &ldquo;Also update my plan&rdquo; on, a technique you add
              is planned for the same day in later weeks.
            </li>
          </BulletList>
          <p>
            The <TextLink href={pages.setTechniques.path}>set techniques feature page</TextLink> has
            screenshots of each step; <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>{" "}
            covers the rest of the log.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Questions about set techniques">
          <FaqList items={faqs} />
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Techniques that take a set
            past failure are demanding; use them with weights you can set down safely, and speak to a
            qualified professional if you have an injury or a health condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.setTechniques, pages.setsPerWeek, pages.logWorkouts, pages.arnoldSplit]} />
      </PageBody>
    </main>
  );
}
