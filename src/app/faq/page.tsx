import type { Metadata } from "next";
import { ContentSection, PageBody, TextLink } from "@/components/content";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { faqGroups } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { faqPageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.faq);

const allFaqs = faqGroups.flatMap((group) => group.items);

export default function FaqPage() {
  const crumbs = trail(pages.home, pages.faq);

  return (
    <main id="main">
      <JsonLd data={faqPageGraph(pages.faq, crumbs, allFaqs)} />
      <PageHero
        trail={crumbs}
        eyebrow="FAQ"
        title="IronBuddy FAQ: offline use, pricing, ads, and privacy"
        updated={pages.faq.modified}
        lead="Answers to the questions people ask most about IronBuddy, an offline workout tracker for Android with no account, no ads, and no subscription."
      />

      <PageBody>
        <nav aria-label="FAQ topics">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/12 px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {faqGroups.map((group) => (
          <ContentSection key={group.id} id={group.id} title={group.title}>
            <FaqList items={group.items} />
          </ContentSection>
        ))}

        <ContentSection id="more-help" title="Still have a question?">
          <p>
            Use the <TextLink href={pages.contact.path}>contact page</TextLink> or write to{" "}
            {siteConfig.contactEmail}. For a fuller picture of how the app handles your data, read
            the{" "}
            <TextLink href={pages.privacy.path}>privacy policy</TextLink>.
          </p>
        </ContentSection>

        <CtaBanner />

        <RelatedLinks
          items={[pages.features, pages.offline, pages.noSubscription, pages.privacyFocused]}
        />
      </PageBody>
    </main>
  );
}
