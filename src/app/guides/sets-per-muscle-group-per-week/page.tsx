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

export const metadata: Metadata = pageMetadata(pages.setsPerWeek);

const ranges = [
  ["Keeping what you have", "3–6", "Enough to hold muscle during a busy month or a diet."],
  ["First year of training", "6–10", "Beginners grow on little. More mostly adds soreness."],
  ["Intermediate", "10–16", "Where most of the growth in the research happens."],
  ["Advanced, or a lagging muscle", "14–20+", "Returns get smaller past this, and recovery gets harder."],
] as const;

/** The six areas Muscle Balance counts (src/lib/week-muscles.ts in the app). */
const areas = [
  ["Chest", "Chest"],
  ["Shoulders", "Front and side delts, rear delts"],
  ["Arms", "Biceps, triceps, forearms"],
  ["Core", "Abdominals"],
  ["Legs", "Quads, hamstrings, glutes, calves, adductors, abductors"],
  ["Back", "Lats, middle back, lower back, traps, neck"],
] as const;

const faqs: Faq[] = [
  {
    id: "faq-sets-warm-ups",
    question: "Do warm-up sets count?",
    answer:
      "No. A working set is one taken to within a few reps of failure; a warm-up stops long before that. If you log warm-ups, leave the weight or reps at zero and IronBuddy skips them, or log them and subtract them in your head. Most people simply don't log warm-ups.",
  },
  {
    id: "faq-sets-arms-low",
    question: "Why does Arms look so low on my Push Pull Legs split?",
    answer:
      "Because IronBuddy counts each set once, for the exercise's main muscle. A bench press counts for Chest even though your triceps work hard, and a row counts for Back though your biceps do. On a push/pull split with two direct arm exercises a week, Arms shows six or eight sets while the arms actually get work on every pressing and pulling set. Read the number as direct sets, and add direct arm work only if your arms are genuinely lagging.",
  },
  {
    id: "faq-sets-per-session",
    question: "How many sets for one muscle in one session?",
    answer:
      "Somewhere around eight to ten hard sets is where the quality of the later sets falls off for most people. If your plan calls for sixteen sets of chest a week, two sessions of eight beat one session of sixteen. That is the main reason twice-a-week splits like Upper Lower and Push Pull Legs are so common.",
  },
];

export default function SetsPerWeekGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.setsPerWeek);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.setsPerWeek, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training"
        title="How many sets per muscle group per week?"
        updated={pages.setsPerWeek.modified}
        lead="How many sets per muscle group per week you do is the number that decides most of what a programme does. Too few and nothing changes; too many and you stop recovering. The research gives a useful range, and a workout log tells you where you actually are. This guide covers what counts as a set, how many you need, how to spread them over the week, and how to check your own numbers."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>A working set is one taken to within a few reps of failure. Warm-ups don&apos;t count.</li>
            <li>Roughly 10 to 20 hard sets per muscle per week is where most growth happens; beginners need fewer, and 3 to 6 keeps what you have.</li>
            <li>Spread them over two or more sessions. Eight to ten hard sets for one muscle in one session is about the useful limit.</li>
            <li>Count each set once, for the main muscle of the exercise, and read the totals by body area each week.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-counts" title="What counts as a set">
          <p>
            Not every set in a session is a working set. The ones that count are hard: taken to failure
            or within one to three reps of it, with a weight that makes the last reps slow. Warm-up sets
            do not count, however many you do. A set you stopped at six because the phone rang does not
            count either.
          </p>
          <p>
            Drop sets, rest-pause chunks and the exercises in a superset do count, because each one is
            hard work with its own reps and weight; see{" "}
            <TextLink href={pages.logTechniques.path}>drop sets, supersets and rest-pause</TextLink>. A
            set logged with no reps and no weight is skipped by IronBuddy, which is the easy way to
            keep warm-ups out of the count.
          </p>
        </ContentSection>

        <ContentSection id="how-many" title="How many you need: what the research suggests">
          <p>
            Reviews of the training research point the same way: more weekly sets grow more muscle, up
            to a point. A 2017 review by Schoenfeld and colleagues found that ten or more hard sets per
            muscle per week produced clearly more growth than fewer than five, and later work suggests
            the useful range for most trained people runs from about ten to twenty, with smaller returns
            and a bigger recovery cost beyond that. The exact number depends on the person, the
            muscle, sleep and food, so treat these as a map, not a prescription.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Sensible weekly ranges of hard sets per muscle group for different goals and levels</caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-5">Goal or level</th>
                  <th scope="col" className="whitespace-nowrap px-3 py-3 sm:px-5">Sets a week</th>
                  <th scope="col" className="px-3 py-3 sm:px-5">Note</th>
                </tr>
              </thead>
              <tbody>
                {ranges.map(([who, sets, note], index) => (
                  <tr key={who} className={index !== ranges.length - 1 ? "border-b border-white/8" : undefined}>
                    <th scope="row" className="px-3 py-3 align-top font-medium text-white sm:px-5">{who}</th>
                    <td className="px-3 py-3 align-top font-semibold text-primary sm:px-5">{sets}</td>
                    <td className="px-3 py-3 align-top leading-relaxed sm:px-5">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Big muscles (legs, back) tolerate the top of the range; small ones that get indirect work
            from everything else (biceps, triceps, rear delts) need less direct work than the table
            suggests. If in doubt, start at the bottom of your range and add a set every few weeks while
            the numbers keep climbing.
          </p>
        </ContentSection>

        <ContentSection id="direct-and-indirect" title="Direct and indirect sets: how to count a bench press">
          <p>
            A bench press works the chest, the front delts and the triceps. Does it count as a set for
            all three? Different coaches count differently: some give the main muscle a full set and the
            helpers half a set, some count everything, some count only the main muscle. IronBuddy uses
            the last rule: <Strong>every set counts once, for the exercise&apos;s main muscle</Strong>.
            A bench press is a Chest set, a row is a Back set, a squat is a Legs set.
          </p>
          <p>
            That keeps the totals honest and comparable from week to week, but it means the numbers are{" "}
            <em>direct</em> sets. Arms and shoulders in particular get a lot of indirect work from
            presses and pulls that the count does not show. If your plan has eight direct arm sets and a
            lot of pressing, your triceps are getting plenty; don&apos;t add more just because the number
            looks small.
          </p>
        </ContentSection>

        <ContentSection id="six-areas" title="The six areas IronBuddy counts">
          <p>
            Muscle Balance groups the detailed muscles into six body areas so the chart stays readable.
            Legs is the biggest group by far, so expect its number to run well above the others.
          </p>
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">The six body areas in Muscle Balance and the muscles each one includes</caption>
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <th scope="col" className="px-3 py-3 sm:px-5">Area</th>
                  <th scope="col" className="px-3 py-3 sm:px-5">Muscles it includes</th>
                </tr>
              </thead>
              <tbody>
                {areas.map(([area, muscles], index) => (
                  <tr key={area} className={index !== areas.length - 1 ? "border-b border-white/8" : undefined}>
                    <th scope="row" className="px-3 py-3 align-top font-medium text-white sm:px-5">{area}</th>
                    <td className="px-3 py-3 align-top leading-relaxed sm:px-5">{muscles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The Volume per muscle widget on Home lists the detailed muscles instead (quads, hamstrings,
            glutes and so on), for when the area total hides a gap, such as plenty of quads and no
            hamstrings.
          </p>
        </ContentSection>

        <ContentSection id="spread" title="Spread the sets across the week">
          <p>
            The same weekly sets work better in two or three sessions than in one. Quality falls after
            about eight to ten hard sets for a muscle in one session: the last sets of a sixteen-set
            chest day are done tired, with less weight and worse form, and add more fatigue than
            growth. Two days of eight get sixteen good sets.
          </p>
          <p>
            That is the case for twice-a-week splits. An{" "}
            <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> or{" "}
            <TextLink href={pages.pushPullLegs.path}>Push Pull Legs</TextLink> hits every muscle twice;
            a <TextLink href={pages.broSplit.path}>bro split</TextLink> once, with all the sets in one
            session. Both can work; the twice-a-week version is easier to do well.
          </p>
        </ContentSection>

        <ContentSection id="example" title="Example: an Upper Lower week, counted">
          <p>
            Counting IronBuddy&apos;s Upper / Lower preset the app&apos;s way (each exercise for its main
            muscle) gives roughly: Chest 8, Back 12, Shoulders 6, Arms 8, Core 4, Legs 28. Legs looks
            huge because it holds quads, hamstrings, glutes and calves together: per muscle it is about
            6 to 8 each. Chest at 8 direct sets plus the indirect work from shoulder presses sits at the
            low end of the intermediate range, which is where a beginner-friendly preset should be. The
            obvious upgrade after a few months is a third chest set on each upper day.
          </p>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Checking your week in IronBuddy">
          <BulletList>
            <li>
              <Strong>Muscle Balance</Strong> on Home: this week&apos;s sets for the six areas against
              last week&apos;s, and a line naming any area not trained yet. Tap ⓘ for how it counts.
            </li>
            <li>
              <Strong>Volume per muscle</Strong> on Home: the same sets per detailed muscle, as bars.
            </li>
            <li>
              <Strong>Workout summary:</Strong> after each session, the sets per muscle for that
              workout, so you can see what the day added.
            </li>
            <li>
              <Strong>What to do with it:</Strong> an area at zero in the second half of the week means
              a missed session or a plan with a hole in it; an area far above the others for weeks,
              with sore joints, means trim a set. Change one thing, then watch the next two weeks.
            </li>
          </BulletList>
          <p>
            The <TextLink href={pages.muscleBalance.path}>Muscle Balance feature page</TextLink> has
            screenshots; <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>{" "}
            covers what to do with the sets once the count is right.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Questions about weekly sets">
          <FaqList items={faqs} />
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Add sets gradually, choose
            loads that suit your experience and recovery, and speak to a qualified professional if you
            have an injury or a health condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.muscleBalance, pages.upperLower, pages.logTechniques, pages.progressiveOverload]} />
      </PageBody>
    </main>
  );
}
