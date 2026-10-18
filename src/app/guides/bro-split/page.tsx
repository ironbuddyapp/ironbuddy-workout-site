import type { Metadata } from "next";
import { BulletList, Callout, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { RunInIronBuddy, SplitDayTable, WeekLayouts } from "@/components/SplitGuide";
import type { SplitDay, WeekLayout } from "@/components/SplitGuide";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.broSplit);

/** Mirrors IronBuddy's "Bro Split (5×)" preset (src/lib/seed-data.ts). */
const days: SplitDay[] = [
  {
    day: "Chest",
    focus: "Monday",
    exercises: [
      "Machine Chest Press 3×10–12",
      "Incline Dumbbell Bench Press 3×10–12",
      "Dumbbell Bench Press 2×10–12",
      "Push-Up 2×10–15",
    ],
  },
  {
    day: "Back",
    focus: "Tuesday",
    exercises: [
      "Lat Pulldown 3×10–12",
      "Chest-Supported Row 3×10–12",
      "Seated Cable Row 3×10–12",
      "Straight-Arm Cable Pulldown 2×12–15",
      "Reverse Pec Deck 2×12–15",
    ],
  },
  {
    day: "Shoulders",
    focus: "Wednesday",
    exercises: [
      "Machine Shoulder Press 3×10–12",
      "Cable Lateral Raise 2×12–15",
      "Reverse Pec Deck 3×12–15",
      "Dumbbell Front Raise 2×12–15",
    ],
  },
  {
    day: "Legs",
    focus: "Thursday",
    exercises: [
      "Leg Press 3×10–12",
      "Hack Squat 2×10–12",
      "Dumbbell Romanian Deadlift 3×10–12",
      "Seated Leg Curl 3×12–15",
      "Leg Extension 2×12–15",
      "Standing Calf Raise 3×12–15",
    ],
  },
  {
    day: "Arms",
    focus: "Friday",
    exercises: [
      "EZ-Bar Curl 3×10–12",
      "Incline Dumbbell Curl 2×12–15",
      "Dumbbell Hammer Curl 2×12–15",
      "Cable Triceps Pushdown 3×10–12",
      "Overhead Cable Triceps Extension 2×12–15",
      "Rope Triceps Pushdown 2×12–15",
    ],
  },
];

const layouts: WeekLayout[] = [
  {
    name: "Monday to Friday",
    week: "Chest, Back, Shoulders, Legs, Arms, rest, rest",
    fits: "The classic. Each body part has its day, and the weekend is off. Legs on Thursday keeps them away from Monday's chest day, when the gym is busiest.",
  },
  {
    name: "Legs first",
    week: "Legs, Chest, Back, rest, Shoulders, Arms, rest",
    fits: "People who skip legs when it comes late in the week. Putting it on Monday makes it the day you are least likely to miss.",
  },
  {
    name: "Four days, rotating",
    week: "Chest, Back, Shoulders, Legs, then Arms, Chest, Back, Shoulders the next week",
    fits: "A four-day week. Each body part then comes round every nine days or so rather than every seven.",
  },
];

const faqs: Faq[] = [
  {
    id: "faq-bro-split-once-a-week",
    question: "Is training each muscle once a week enough?",
    answer:
      "It can be, if the day's volume is enough. Reviews of the research suggest that when weekly sets are equal, training a muscle once or twice a week gives similar growth. The practical catch is that cramming 12 to 15 sets of chest into one session is hard to do well, and a missed Monday means chest waits two weeks. That is why twice-a-week splits are the usual recommendation for most people.",
  },
  {
    id: "faq-bro-split-who",
    question: "Who should use a bro split?",
    answer:
      "Lifters who enjoy giving one body part their full attention, who recover slowly from heavy sessions, or who have a muscle that needs its own day. It also suits people with a lot of training experience, who can do enough quality work in one session for a muscle to grow on it.",
  },
  {
    id: "faq-bro-split-arms-day",
    question: "Do I really need an arm day?",
    answer:
      "On a bro split, yes: biceps and triceps get little on the other days because the preset's back and chest days are built around compound presses and pulls. If you drop the arm day, add a curl and a pushdown to the back and chest days instead.",
  },
];

export default function BroSplitGuidePage() {
  const crumbs = trail(pages.home, pages.guides, pages.broSplit);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.broSplit, { trail: crumbs, article: true, faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Guide · training splits"
        title="The bro split: one body part a day, Monday to Friday"
        updated={pages.broSplit.modified}
        lead="A bro split gives every major body part its own day: chest on Monday, back on Tuesday, shoulders, legs, arms. It is the split most gyms were built around, it is easy to follow, and it lets you do a lot of work for one muscle while it is fresh. It also has trade-offs worth knowing before you pick it."
      />

      <PageBody>
        <Callout title="Key takeaways">
          <BulletList>
            <li>Five days, five body parts: chest, back, shoulders, legs, arms.</li>
            <li>Each muscle is trained once a week with a lot of sets in one session.</li>
            <li>Simple to follow and good for focusing on one area, but a missed day sets that muscle back a fortnight.</li>
            <li>Track each day against the same day last week; watch weekly sets per muscle, not per session.</li>
          </BulletList>
        </Callout>

        <ContentSection id="what-it-is" title="What a bro split is">
          <p>
            The name is affectionate. A body-part split, or bro split, divides the week by muscle
            rather than by movement: one day for chest, one for back, one for shoulders, one for legs,
            one for arms. Each session does ten to twenty sets for its body part and almost nothing for
            the others, so every muscle gets a hard day and then six days to recover.
          </p>
          <p>
            Compared with an <TextLink href={pages.upperLower.path}>Upper Lower split</TextLink> or{" "}
            <TextLink href={pages.pushPullLegs.path}>Push Pull Legs</TextLink>, the frequency is lower
            (once a week instead of twice) and the volume per session is higher. Whether that works
            for you depends on how much good work you can do for one muscle in one go.
          </p>
        </ContentSection>

        <ContentSection id="each-day" title="What goes on each day">
          <p>
            These are the five days of IronBuddy&apos;s Bro Split (5×) preset, Monday to Friday.
            Every day starts with the heaviest compound for that body part and finishes with isolation
            work. Rest about 2 minutes after the big lifts, 90 seconds after rows and pulldowns, a
            minute after the rest.
          </p>
          <SplitDayTable days={days} caption="The five days of a bro split with the exercises, sets and reps of each" />
          <p>
            The preset keeps each day to four to six exercises so a session is about 45 to 60 minutes.
            If you have time and recover well, add a set to the first two exercises before adding new
            exercises.
          </p>
        </ContentSection>

        <ContentSection id="weekly-layouts" title="How to lay out the week">
          <WeekLayouts layouts={layouts} />
        </ContentSection>

        <ContentSection id="trade-offs" title="Strengths and trade-offs">
          <BulletList>
            <li>
              <Strong>Strength: focus.</Strong> Chest day is chest day. You can hit a muscle from three
              angles and go home.
            </li>
            <li>
              <Strong>Strength: recovery.</Strong> Six days between sessions for the same muscle is
              easy on the joints, which is why many older lifters prefer it.
            </li>
            <li>
              <Strong>Trade-off: frequency.</Strong> A muscle grows for a day or two after it is
              trained, then waits. Twice-a-week splits use more of the week.
            </li>
            <li>
              <Strong>Trade-off: missed days.</Strong> Skip Thursday and legs wait until next Thursday.
              On Upper Lower, a missed day costs half a week.
            </li>
            <li>
              <Strong>Trade-off: tired sets.</Strong> The last five sets of a fifteen-set chest day are
              not as good as the first five. Spreading them across two days usually gives better reps.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="tracking" title="How to track a bro split">
          <BulletList>
            <li>
              <Strong>Same day, last week.</Strong> Chest day against last chest day. With one session
              per muscle per week, every comparison is a week apart, so expect smaller jumps than on a
              twice-a-week plan.
            </li>
            <li>
              <Strong>Weekly sets per muscle.</Strong> A bro split lives or dies on whether the one
              session has enough volume. Muscle Balance on IronBuddy&apos;s Home shows your sets per
              body area for the week; if an area is low, add a set there, not a new exercise.
            </li>
            <li>
              <Strong>Watch the second half of the session.</Strong> If reps collapse on the last
              exercises every week, the day is too long. Trim it and keep the quality.
            </li>
            <li>
              <Strong>Add weight when all sets hit the top of the range.</Strong> The{" "}
              <TextLink href={pages.progressiveOverload.path}>progressive overload guide</TextLink>{" "}
              explains the method; on a 10–12 range, 12 on every set means more weight next week.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="in-ironbuddy" title="Running a bro split in IronBuddy">
          <RunInIronBuddy
            preset="Bro Split (5×)"
            note="It runs Monday to Friday out of the box; Edit Week moves any day, and Change Day swaps a single date when the week goes sideways."
          />
        </ContentSection>

        <ContentSection id="faq" title="Bro split questions">
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

        <RelatedLinks items={[pages.arnoldSplit, pages.upperLower, pages.pushPullLegs, pages.trainingSplits]} />
      </PageBody>
    </main>
  );
}
