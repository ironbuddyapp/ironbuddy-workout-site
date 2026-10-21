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

export const metadata: Metadata = pageMetadata(pages.shareCards);

const faqs: Faq[] = [
  {
    id: "upload",
    question: "Does sharing upload my data anywhere?",
    answer:
      "No. The image is drawn on your phone from your own log. Share image hands it to Android's share sheet, so it goes only to the app you pick (Instagram, WhatsApp, a message); Save to phone writes it to Pictures/IronBuddy. IronBuddy has no servers and never sees it.",
  },
  {
    id: "size",
    question: "What size are the cards?",
    answer:
      "1080 × 1350 pixels, the 4:5 portrait format Instagram posts use, which also works for stories, WhatsApp and most feeds. They are dark, in your accent colour, with the IronBuddy name and the line \"Built by lifters, for lifters.\"",
  },
  {
    id: "trial",
    question: "Can I share during the free trial?",
    answer:
      "Share cards are part of the full version. During the trial, and after it if you don't buy, the share buttons show a small lock and open a sheet that explains what the full version adds. The one-time purchase unlocks them along with Customise Home, accent colours, export and import.",
  },
];

export default function ShareCardsPage() {
  const crumbs = trail(pages.home, pages.features, pages.shareCards);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.shareCards, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Share cards · full version"
        title="Share your workout as an image, with PRs and charts"
        updated={pages.shareCards.modified}
        lead="A new record deserves more than a line in a log, so IronBuddy lets you share your workout as an image. It turns a workout, a personal record or a progress chart into an image, made entirely on your phone, that you can post to Instagram, send to a friend or keep in your gallery. Nothing is uploaded to anyone."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <FeatureBlock id="pr-card" title="The personal record card" shot="share">
          <p>
            Open a workout in History and tap <Strong>Share</Strong>. A workout with records lets
            you switch between the workout card and a card for each PR: the exercise, the set that
            earned it (&ldquo;105 kg × 12&rdquo;), and how far you have come since you started
            (&ldquo;+25 kg since Jul 2026&rdquo;). Tapping a PR marker in the summary opens that
            record&apos;s card directly.
          </p>
        </FeatureBlock>

        <FeatureBlock id="workout-card" title="The workout card" shot="summary" flip>
          <p>
            The workout card sums up the session: date, exercises, total volume, the number of sets,
            your PRs, and the muscles you worked on the body map. It is the same information as the{" "}
            <TextLink href={pages.workoutSummary.path}>workout summary</TextLink>, laid out for a
            feed.
          </p>
        </FeatureBlock>

        <FeatureBlock id="chart-card" title="The chart card" shot="shareChart">
          <p>
            Every chart on the Progress tab has a share icon next to its full-screen button. The
            card shows the exercise, the chart type, the headline number and the change over the
            range you picked, with the line itself drawn underneath. Records on the exercise page
            can be shared the same way.
          </p>
        </FeatureBlock>

        <ContentSection id="how-to" title="How to share a card">
          <NumberedList>
            <li>Open a workout in History (or a chart in Progress) and tap the share icon.</li>
            <li>Pick the workout card or one of its PR cards in the preview.</li>
            <li>
              Tap <Strong>Share image</Strong> to send it through Android&apos;s share sheet, or{" "}
              <Strong>Save to phone</Strong> to keep it in Pictures → IronBuddy.
            </li>
          </NumberedList>
          <BulletList>
            <li>Cards use your accent colour, so a gold theme gives a gold card.</li>
            <li>They are 1080 × 1350 px, the portrait format Instagram posts use.</li>
            <li>The image is made on your phone. There is no account and no upload.</li>
          </BulletList>
        </ContentSection>

        <ContentSection id="faq" title="Share card questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.workoutSummary, pages.progressCharts, pages.customizableHome, pages.privacyFocused]} />
      </PageBody>
    </main>
  );
}
