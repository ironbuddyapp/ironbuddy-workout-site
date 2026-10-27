import type { Metadata } from "next";
import { BulletList, ContentSection, NumberedList, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { FeatureBlock } from "@/components/FeatureBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { onIphone } from "@/lib/iphone";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.customizableHome);

const faqs: Faq[] = [
  {
    id: "trial",
    question: "Can I customise Home during the free trial?",
    answer:
      "No. Calendar look and arranging the widgets are both part of the full version: during the trial you get the default calendar and widgets on all three pages, and the lock in Settings → Calendar look or the dashboard button opens a sheet that shows what the full version adds. After the one-time purchase your calendar look and arrangement are saved with your settings and included in exports.",
  },
  {
    id: "reset",
    question: "What if I make a mess of it?",
    answer:
      "Tap Reset in the Customise bar to put the default widgets back on all three pages. Removing a single widget shows an Undo button for five seconds, and any widget you removed can be added again from Add. The calendar look changes back the same way it changed: pick Ring and the date greeting in Calendar look.",
  },
  {
    id: "widgets",
    question: onIphone("Are these home screen widgets for my phone?", "Are these Android home screen widgets?"),
    answer: onIphone(
      "No. IronBuddy's widgets live on its own Home screen, the first tab inside the app. They are arranged on three swipeable pages that always fit your screen, so there is nothing to scroll and nothing to install on your phone's home screen, on Android or iPhone.",
      "No. IronBuddy's widgets live on its own Home screen, the first tab inside the app. They are arranged on three swipeable pages that always fit your screen, so there is nothing to scroll and nothing to install on the Android launcher.",
    ),
  },
];

export default function CustomizableHomePage() {
  const crumbs = trail(pages.home, pages.features, pages.customizableHome);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.customizableHome, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Customizable Home · full version"
        title="A workout calendar app with a Home you arrange yourself"
        updated={pages.customizableHome.modified}
        lead="IronBuddy works as a workout calendar app: its Home has a calendar at the top and widgets below it: the muscles you worked this week, your last workout, a chart for any exercise, your personal records, Muscle Balance and more. Pick how the calendar looks, and in the full version decide which widgets you see, how big each one is and where it sits, across three pages that fit your screen without scrolling."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="cards" title="Nine widgets, three pages" shot="dashboard">
          <p>
            Every page of Home is a two-column grid that fills the space under the calendar. Out
            of the box, page 1 shows <Strong>Muscles worked</Strong> this week on a body map, your{" "}
            <Strong>last workout</Strong> and shortcuts to your splits and the exercise library.
            Page 2 has an <Strong>exercise chart</Strong>, your <Strong>personal records</Strong>,
            workout counts and body weight. Page 3 has <Strong>Muscle Balance</Strong> and volume
            per muscle.
          </p>
          <p>
            The full version lets you change all of that. Add an exercise chart for every lift you
            care about, drop the widgets you never look at, and move the ones you check most to page 1.
          </p>
        </FeatureBlock>

        <FeatureBlock id="calendar-look" title="Your calendar, five ways" shot="calendarLook" flip>
          <p>
            The calendar always stays at the top of Home, but you choose how it is drawn. Open{" "}
            <Strong>Settings → Calendar look</Strong>, or the calendar icon in the Customise bar,
            and pick three things:
          </p>
          <BulletList>
            <li>
              <Strong>Days:</Strong> Ring (each day in a circle), Boxes (the classic boxes with a
              status bar), Track (the week as a line that fills up to today), Effort (a bar per day,
              as tall as what you lifted) or Agenda (a list of training days with their results).
            </li>
            <li>
              <Strong>Progress:</Strong> a Ring, Segments (one piece per planned workout), a
              Checklist, a big Number, or a Countdown (&ldquo;1 left · next: today&rdquo;).
            </li>
            <li>
              <Strong>Greeting:</Strong> today&apos;s date, your name, or none.
            </li>
          </BulletList>
          <p>
            Every style keeps the same marks and the same day panel, and changes apply as you tap.
            Calendar look is part of the full version: during the free trial Settings → Calendar look shows a lock.
          </p>
        </FeatureBlock>

        <FeatureBlock id="arrange" title="Drag, resize, add, remove" shot="customise" flip>
          <p>
            Tap the round <Strong>dashboard button</Strong> right of the page dots, or hold a widget for a moment. Every
            widget gets an × to remove it and a ↘ corner handle to resize it, and the bar at the top names
            the three gestures.
          </p>
          <BulletList>
            <li>
              <Strong>Move:</Strong> hold a widget for half a second until it lifts, then drag. A
              dashed outline shows where it will land, and a label under your finger says at what
              size. A quick swipe still scrolls the page or moves to the next page.
            </li>
            <li>
              <Strong>Resize:</Strong> drag the corner handle, or tap it for the list of sizes the
              widget has: Small, Wide, Tall or Large. Every widget is designed for each of its sizes,
              and bigger widgets show more.
            </li>
            <li>
              <Strong>Another page:</Strong> rest a lifted widget at the left or right edge and the
              next page slides in. Drop it there.
            </li>
            <li>
              <Strong>Add and remove:</Strong> Add lists every widget, including one that is on
              another page (tap it to move it here). Removing shows Undo for five seconds.
            </li>
          </BulletList>
        </FeatureBlock>

        <FeatureBlock id="sizes" title="Widgets that fill the space" shot="customiseSizes">
          <p>
            Drop a widget next to a tall one and rest for a moment: it offers to grow and fill the
            free half, with the label saying <em>Tall · fills the space</em>. Move a little and it
            keeps its size. The other widgets slide aside as you go, so the page never has holes.
          </p>
          <p>
            A tall Muscles worked widget shows a bigger body map; a large Muscle Balance
            puts the chart across the full width with the numbers under it; a wide exercise chart
            shows the trend line, axis and time range. Small widgets keep the name, one line saying
            what the number is, and the number.
          </p>
        </FeatureBlock>

        <ContentSection id="how-to" title="How to customise Home, step by step">
          <NumberedList>
            <li>Open Home and tap the round <Strong>dashboard button</Strong> right of the page dots (full version), or hold any widget.</li>
            <li>Tap × on the widgets you don&apos;t want. Undo appears for five seconds if you change your mind.</li>
            <li>Tap <Strong>Add</Strong> to add a widget, or to move one over from another page.</li>
            <li>Hold a widget until it lifts, drag it where you want it, and let go. Rest it at a page edge to carry it to the next page.</li>
            <li>Tap a widget&apos;s ↘ handle and pick Small, Wide, Tall or Large, or drag the handle.</li>
            <li>Tap <Strong>Done</Strong>. Your layout is saved on your phone and included when you export your data.</li>
          </NumberedList>
          <p>
            <Strong>Reset</Strong> puts the default widgets back on all three pages, after asking.
            Keyboard users can move a focused widget with the arrow keys.
          </p>
        </ContentSection>

        <ContentSection id="full-version" title="Part of the full version">
          <p>
            The {siteConfig.freeTrialDays}
            {onIphone(
              "-day free trial includes the whole workout tracker with the default Home. The one-time purchase on Google Play or the App Store adds arranging Home's widgets, the eight accent colours,",
              "-day free trial includes the whole workout tracker with the default Home. The one-time purchase on Google Play adds arranging Home's widgets, the eight accent colours,",
            )}{" "}
            <TextLink href={pages.shareCards.path}>share cards</TextLink>, and export and import of
            your data. There is no subscription. Read{" "}
            <TextLink href={pages.noSubscription.path}>how the trial and the purchase work</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Customizable Home questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.muscleBalance, pages.progressCharts, pages.features, pages.noSubscription]} />
      </PageBody>
    </main>
  );
}
