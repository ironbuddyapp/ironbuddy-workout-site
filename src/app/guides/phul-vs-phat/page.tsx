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

export const metadata: Metadata = pageMetadata(pages.phulVsPhat);

/** The two weeks as IronBuddy's presets lay them out. */
const layouts: WeekLayout[] = [
  {
    name: "PHUL: four days",
    week: "Upper Power, Lower Power, rest, Upper Hypertrophy, Lower Hypertrophy, rest, rest",
    fits: "Two heavy days, two higher-rep days, every muscle twice. IronBuddy's PHUL preset, set to Mon / Tue / Thu / Fri and listed as Intermediate.",
  },
  {
    name: "PHAT: five days",
    week: "Upper Power, Lower Power, rest, Back & Shoulders Hypertrophy, Lower Hypertrophy, Chest & Arms Hypertrophy, rest",
    fits: "The same two heavy days, then three higher-rep days that split the upper body in two. IronBuddy's PHAT preset, listed as Advanced.",
  },
  {
    name: "PHUL with a fifth day",
    week: "Upper Power, Lower Power, rest, Upper Hypertrophy, Lower Hypertrophy, arms or a weak point, rest",
    fits: "A middle path: keep PHUL and add one short day for a lagging body part. In IronBuddy, edit the PHUL preset and add a day; your copy goes under My splits.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-phul-phat-which",
    question: "PHUL or PHAT: which should I run?",
    answer:
      "Count your training days. With four, run PHUL; it covers strength and size for every muscle twice a week. With five, and a year or so of training behind you, PHAT uses the extra day to split the upper-body hypertrophy work in two. If you are between the two, run PHUL first: it is the easier week to recover from, and PHAT is the same idea with one day more.",
  },
  {
    id: "faq-phul-phat-beginner",
    question: "Is PHUL or PHAT better for beginners?",
    answer:
      "Neither is a beginner plan, but PHUL is the closer of the two. IronBuddy lists PHUL as Intermediate and PHAT as Advanced. A beginner gets more from a three-day full body plan or an Upper Lower split, then moves to PHUL once the lifts are learned and four sessions a week feel normal.",
  },
  {
    id: "faq-phul-phat-ppl",
    question: "What about PHUL vs PHAT vs PPL?",
    answer:
      "Push Pull Legs is a different kind of split: it groups by movement and has no separate power and hypertrophy days. Six-day PPL trains every muscle twice, like PHUL and PHAT, but every session is the same style. Pick PHUL or PHAT when you want heavy low-rep days and lighter high-rep days in the same week; pick PPL when you want every session to look alike and be easy to repeat.",
  },
  {
    id: "faq-phul-phat-switch",
    question: "Can I move from PHUL to PHAT later?",
    answer:
      "Yes, and it is the natural order. The two power days are the same idea in both programs, so your heavy lifts carry over. In IronBuddy, set the PHAT preset active when you are ready; your exercise history stays with each exercise, so the summary still compares the heavy lifts with last time.",
  },
];

export default function PhulVsPhatPage() {
  const crumbs = trail(pages.home, pages.guides, pages.phulVsPhat);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.phulVsPhat, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="PHUL vs PHAT: four days or five of power and hypertrophy"
        updated={pages.phulVsPhat.modified}
        lead="PHUL vs PHAT is mostly a question of days. Both programs open the week with a heavy upper day and a heavy lower day, then switch to higher reps for size. PHUL does the size work in two sessions, one upper and one lower, for four days a week. PHAT splits the upper-body size work into back and shoulders on one day and chest and arms on another, for five. This guide puts the two next to each other and shows how to track whichever you choose."
      />

      <PageBody toc>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Same idea: two power days early in the week, hypertrophy days after. PHUL takes four sessions, PHAT five.</li>
            <li>PHAT&apos;s extra day splits upper-body hypertrophy in two, so the back, shoulders, chest and arms each get more sets.</li>
            <li>PHUL is the easier week to recover from; IronBuddy lists PHUL as Intermediate and PHAT as Advanced.</li>
            <li>Track both the same way: power days by weight and estimated 1RM, hypertrophy days by reps and volume.</li>
          </BulletList>
        </Callout>

        <ContentSection id="shared-idea" title="What the two programs share">
          <p>
            <TextLink href={pages.phul.path}>PHUL</TextLink> stands for Power Hypertrophy Upper Lower;{" "}
            <TextLink href={pages.phat.path}>PHAT</TextLink> for Power Hypertrophy Adaptive Training,
            by Layne Norton. The first two words are the point of both: some days are for strength,
            with heavy weights and low reps on the compound lifts, and the rest are for size, with
            moderate weights, higher reps and more isolation work.
          </p>
          <p>
            Both start the week the same way. Day one is Upper Power, day two is Lower Power, then a
            rest day. Every muscle is trained twice a week in both, once heavy and once for volume.
            Where they part is what happens after the rest day.
          </p>
        </ContentSection>

        <ContentSection id="differences" title="Where PHUL and PHAT differ">
          <BulletList>
            <li>
              <Strong>Days.</Strong> PHUL finishes with Upper Hypertrophy and Lower Hypertrophy: four
              sessions. PHAT finishes with Back &amp; Shoulders, Lower, and Chest &amp; Arms: five.
            </li>
            <li>
              <Strong>Upper-body volume.</Strong> On PHUL, one hypertrophy session has to cover chest,
              back, shoulders and arms, so each gets a few sets. On PHAT, the upper body gets two
              sessions, so the back and shoulders can take a dozen sets and the chest and arms another
              dozen. That is the reason to run PHAT: more size work for the upper body.
            </li>
            <li>
              <Strong>Recovery.</Strong> Five sessions with two of them heavy is a lot. PHAT asks for
              the sleep and food to match. PHUL leaves three rest days a week and is the easier program
              to keep up for months.
            </li>
            <li>
              <Strong>Session length.</Strong> PHUL&apos;s Upper Hypertrophy day is long because it
              carries the whole upper body. PHAT&apos;s hypertrophy days are shorter each, with more of
              them.
            </li>
            <li>
              <Strong>Who they are for.</Strong> PHUL suits intermediates with four days who want both
              strength and size. PHAT suits intermediate and advanced lifters with five days, or a
              lagging upper-body part that needs its own session.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="The two weeks side by side">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="which-to-pick" title="Which one to pick">
          <BulletList>
            <li>
              <Strong>Four days: PHUL.</Strong> It is not a cut-down PHAT; it is a complete program at
              four days, and the version most people can recover from.
            </li>
            <li>
              <Strong>Five days and a year of training: PHAT.</Strong> The fifth day only pays off if
              you recover from it. If your Friday and Saturday numbers keep falling, it is too much for
              now.
            </li>
            <li>
              <Strong>A lagging upper-body part: PHAT, or PHUL plus a day.</Strong> Either gives that
              area its own session. The PHUL-plus-a-day layout above is the lighter way in.
            </li>
            <li>
              <Strong>Learning the lifts: neither yet.</Strong> Run a{" "}
              <TextLink href={pages.fullBody.path}>three-day full body plan</TextLink> or an{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> first.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track PHUL or PHAT">
          <BulletList>
            <li>
              <Strong>Two kinds of day, two numbers.</Strong> On the power days, watch the weight on
              the main lifts and the estimated 1RM chart. On the hypertrophy days, watch reps and
              session volume. The week is working when both climb.
            </li>
            <li>
              <Strong>Each day against itself.</Strong> Upper Power against last week&apos;s Upper
              Power, Chest &amp; Arms against last Chest &amp; Arms. The same exercise can appear on a
              power day and a hypertrophy day, so compare per day. IronBuddy&apos;s workout summary
              compares every exercise with its previous session, which on these programs is the same
              day a week ago.
            </li>
            <li>
              <Strong>Weight on power days, reps on hypertrophy days.</Strong> When every power set
              hits the top of its range, add weight. When every hypertrophy set hits the top, add
              weight and drop back to the bottom of the range. The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              covers both.
            </li>
            <li>
              <Strong>Weekly sets per muscle.</Strong> PHAT spreads chest and back over two days each.
              Muscle Balance on IronBuddy&apos;s Home adds the sets up by body area, so you can see
              whether the extra day is landing where you wanted it.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running PHUL or PHAT in IronBuddy">
          <p>
            IronBuddy includes <Strong>PHUL</Strong> and <Strong>PHAT</Strong> among its ten preset
            splits, with exercises, a rep range and a rest time on every exercise. Open Splits, open
            the one you chose, and tap Set active; Home shows the week with each day&apos;s status, and
            Edit Week puts the days on the weekdays you train. To run the heavier originals, edit the
            power days to 5 or 6 reps; the first edit saves your version under My splits and leaves the
            preset as it was. Each program has its own guide with every exercise:{" "}
            <TextLink href={pages.phul.path}>the PHUL workout</TextLink> and{" "}
            <TextLink href={pages.phat.path}>the PHAT workout</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="PHUL vs PHAT questions">
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

        <RelatedLinks items={[pages.phul, pages.phat, pages.upperLower, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
