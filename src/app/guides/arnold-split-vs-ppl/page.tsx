import type { Metadata } from "next";
import { BulletList, Callout, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { WeekLayouts } from "@/components/SplitGuide";
import type { WeekLayout } from "@/components/SplitGuide";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.arnoldVsPpl);

/** The two six-day weeks as IronBuddy's presets lay them out, plus the common hybrids. */
const layouts: WeekLayout[] = [
  {
    name: "Push Pull Legs, six days",
    week: "Push A, Pull A, Legs A, Push B, Pull B, Legs B, rest",
    fits: "Every muscle twice a week, grouped by movement. Chest, front delts and triceps share the Push day; back, rear delts and biceps share the Pull day. IronBuddy's Push / Pull / Legs (6×) preset.",
  },
  {
    name: "Arnold split, six days",
    week: "Chest & Back A, Shoulders & Arms A, Legs A, Chest & Back B, Shoulders & Arms B, Legs B, rest",
    fits: "Every muscle twice a week, grouped by body part. Chest and back share a day; shoulders, biceps and triceps get a day of their own. IronBuddy's Arnold Split (6×) preset.",
  },
  {
    name: "PPL x Arnold split",
    week: "Push, Pull, Legs, Chest & Back, Shoulders & Arms, Legs, rest",
    fits: "The first half of the week is PPL, the second half is the Arnold grouping. Each muscle is still hit twice, with two different pairings. In IronBuddy, open either six-day preset and edit three of its days.",
  },
  {
    name: "Three days of either",
    week: "Push, Pull, Legs (or Chest & Back, Shoulders & Arms, Legs), with a rest day between sessions",
    fits: "Each muscle once a week. The Push / Pull / Legs (3×) preset is the beginner version; the three-day Arnold grouping is a bro split with chest and back paired.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-arnold-ppl-better",
    question: "Is the Arnold split or PPL better for building muscle?",
    answer:
      "Neither has an edge on paper. Both train every muscle twice a week over six days, and the total sets per muscle can be the same. What differs is how the week feels: PPL keeps the pressing muscles together so each session is simpler, while the Arnold split pairs opposite movements so chest and back can alternate with short rests. Pick the one whose sessions you will finish, then progress the weights.",
  },
  {
    id: "faq-arnold-ppl-beginner",
    question: "Should a beginner run PPL or the Arnold split?",
    answer:
      "Push Pull Legs, three days a week. IronBuddy lists Push / Pull / Legs (3×) as a beginner preset and the Arnold Split (6×) as advanced. Six sessions a week of either is for people who already recover well from training; the Arnold split adds the demand of a long chest-and-back day on top of that.",
  },
  {
    id: "faq-ppl-x-arnold",
    question: "What is a PPL x Arnold split?",
    answer:
      "A hybrid week: Push, Pull and Legs in the first three sessions, then Chest & Back, Shoulders & Arms and Legs in the next three. Each muscle is trained twice with two different pairings, so the shoulders and arms get one direct day and one day inside Push and Pull. It is a way to keep the Arnold chest-and-back day without running it twice a week.",
  },
  {
    id: "faq-arnold-ppl-four-days",
    question: "I only have four days. Which should I pick?",
    answer:
      "Neither as written; both are six-day splits. On four days an Upper Lower split or PHUL trains every muscle twice a week with sensible session lengths. IronBuddy has presets for both, and the Upper Lower guide shows the layout.",
  },
];

export default function ArnoldSplitVsPplPage() {
  const crumbs = trail(pages.home, pages.guides, pages.arnoldVsPpl);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.arnoldVsPpl, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="Arnold split vs PPL: the same six days, grouped two different ways"
        updated={pages.arnoldVsPpl.modified}
        lead="The Arnold split vs PPL question comes up because the two splits look alike: six sessions a week, every muscle trained twice, three different days repeated. The difference is how the days are grouped. Push Pull Legs sorts exercises by movement; the Arnold split sorts them by body part and pairs chest with back. This guide sets the two side by side, shows the hybrid people search for, and explains how to track either in IronBuddy."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Both splits run six days with each muscle twice a week; the weekly sets can be identical.</li>
            <li>PPL groups by movement (push, pull, legs); the Arnold split groups by body part (chest &amp; back, shoulders &amp; arms, legs).</li>
            <li>PPL sessions are simpler and shorter; the Arnold chest-and-back day is long but lets opposite movements alternate.</li>
            <li>Beginners: Push / Pull / Legs (3×). Six days of either split is for lifters who already recover well.</li>
          </BulletList>
        </Callout>

        <ContentSection id="how-they-group" title="How each split groups the week">
          <p>
            A <TextLink href={pages.pushPullLegs.path}>Push Pull Legs split</TextLink> puts every
            pressing muscle on one day (chest, front delts, triceps), every pulling muscle on the next
            (back, rear delts, biceps) and the legs on the third. Each muscle works with the muscles
            that help it, so an exercise never fights the one before it for recovery.
          </p>
          <p>
            The <TextLink href={pages.arnoldSplit.path}>Arnold split</TextLink> starts from the body
            parts instead. Chest and back share a day because a press and a row use opposite muscles:
            while one works, the other rests, so the two can alternate with short breaks. Shoulders and
            arms share a day because they are smaller muscles that recover fast. Legs are the same in
            both splits.
          </p>
          <p>
            Run six days, both give every muscle two sessions a week. The weekly sets per muscle can be
            the same number; only the company each muscle keeps on the day changes.
          </p>
        </ContentSection>

        <ContentSection id="differences" title="Where they differ in practice">
          <BulletList>
            <li>
              <Strong>Session length.</Strong> A Push day is one group of muscles with one direction of
              movement, so it is easy to keep to an hour. The Arnold chest-and-back day carries two big
              muscle groups and runs long unless you alternate the exercises in pairs.
            </li>
            <li>
              <Strong>Shoulders and arms.</Strong> On PPL they only get direct work after the big
              presses and pulls, when they are already tired. The Arnold split gives them a whole day
              while they are fresh. If your arms or delts lag, that is the Arnold split&apos;s strongest
              argument.
            </li>
            <li>
              <Strong>Overlap.</Strong> On PPL, the front delts and triceps press on Push day and rest
              on Pull day. On the Arnold split, the chest-and-back day loads the front delts and
              triceps, and the next day trains them directly again. Recovery for the small muscles is
              tighter on the Arnold split.
            </li>
            <li>
              <Strong>Simplicity.</Strong> PPL is easier to remember and to adjust: miss a day, do it
              next time. The Arnold split has more exercises per day and more to keep track of.
            </li>
            <li>
              <Strong>Three-day versions.</Strong> PPL at three days a week is a sound beginner plan.
              The Arnold grouping at three days is just a <TextLink href={pages.broSplit.path}>bro split</TextLink>{" "}
              with chest and back paired, once a week each.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="Four ways to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="which-to-pick" title="Which one to pick">
          <BulletList>
            <li>
              <Strong>Pick PPL</Strong> if you want short, focused sessions, you are new to six-day
              training, or you like being able to skip and resume without breaking the week.
            </li>
            <li>
              <Strong>Pick the Arnold split</Strong> if you have a year or more of training behind you,
              you want a full day for shoulders and arms, and you enjoy the chest-and-back session
              enough to finish it every week.
            </li>
            <li>
              <Strong>Pick the hybrid</Strong> if you want the Arnold chest-and-back day once, not
              twice. PPL x Arnold keeps every muscle at twice a week with two different pairings.
            </li>
            <li>
              <Strong>Pick neither</Strong> if you have four days or fewer. The{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> and{" "}
              <TextLink href={pages.phul.path}>PHUL</TextLink> get the same twice-a-week frequency in
              four sessions.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track either split">
          <BulletList>
            <li>
              <Strong>Same day, last week.</Strong> Push A against last week&apos;s Push A; Chest &amp;
              Back B against last Chest &amp; Back B. On a six-day split that is the only comparison
              that lines up, and IronBuddy&apos;s workout summary makes it per exercise when you log.
            </li>
            <li>
              <Strong>Count weekly sets per muscle.</Strong> The two splits should give a muscle the
              same number of sets a week. Muscle Balance on IronBuddy&apos;s Home adds them up by body
              area, so you can check the split you chose is not short-changing one area.
            </li>
            <li>
              <Strong>Watch the small muscles on the Arnold split.</Strong> If the shoulder-and-arm
              numbers fall while the chest-and-back day climbs, the delts and triceps are not
              recovering between the two days. Drop a set from the direct arm work before changing
              anything else.
            </li>
            <li>
              <Strong>Progress the first lifts of each day.</Strong> When they hit the top of their rep
              range on every set, add weight. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              gives the method.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running either split in IronBuddy">
          <p>
            IronBuddy includes <Strong>Push / Pull / Legs (3×)</Strong>, <Strong>Push / Pull / Legs (6×)</Strong>{" "}
            and <Strong>Arnold Split (6×)</Strong> among its ten preset splits, each with exercises, a rep
            range and a rest time on every exercise. The three-day PPL is listed as Beginner, the
            six-day PPL as Intermediate and the Arnold split as Advanced. Open Splits, pick one, tap
            Set active, and Home shows the week with each day&apos;s status. To build the PPL x Arnold
            hybrid, open either six-day preset and edit its last three days; IronBuddy saves your
            version under My splits and leaves the preset as it was.
          </p>
          <p>
            See <TextLink href={pages.trainingSplits.path}>training splits in IronBuddy</TextLink> for
            screenshots of the presets and the week editor.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Arnold split vs PPL questions">
          <FaqList items={faqs} />
        </ContentSection>

        <Callout title="A note on safety">
          <p>
            This guide is general training information, not medical advice. Choose loads and a weekly
            layout that suit your experience and recovery, and speak to a qualified professional if
            you have an injury or a health condition.
          </p>
        </Callout>

        <CtaBanner />

        <RelatedLinks items={[pages.arnoldSplit, pages.pushPullLegs, pages.upperLower, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
