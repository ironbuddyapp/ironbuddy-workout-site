import { ContentSection, NumberedList, PageBody, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { alternativeFaqs, alternatives } from "@/lib/alternatives";
import type { Alternative } from "@/lib/alternatives";
import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

/**
 * One page per app people look for an alternative to. The parts every page shares (the comparison checklist and
 * who IronBuddy does not suit) live once on the hub and are linked, so these pages stay distinct from each other.
 */
export function AlternativePage({ alt }: { alt: Alternative }) {
  const crumbs = trail(pages.home, pages.alternatives, alt.page);
  const faqs = alternativeFaqs(alt);
  const others = Object.values(alternatives)
    .filter((other) => other.name !== alt.name)
    .map((other) => other.page);

  return (
    <main id="main">
      <JsonLd data={pageGraph(alt.page, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow={`${alt.name} alternative`}
        title={alt.heading}
        updated={alt.page.modified}
        lead={alt.lead}
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <ContentSection id={alt.focus.id} title={alt.focus.title}>
          {alt.focus.body}
        </ContentSection>

        <ContentSection id={alt.howTo.id} title={alt.howTo.title}>
          {alt.howTo.body}
        </ContentSection>

        <ContentSection id="switching" title={`Switching from ${alt.name} to IronBuddy`}>
          <NumberedList>
            {alt.switching.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </NumberedList>
        </ContentSection>

        <ContentSection id="compare" title={`Compare IronBuddy and ${alt.name} yourself`}>
          <p>
            In short, IronBuddy is Android-only, works offline, has no account and no ads, and costs{" "}
            {siteConfig.price.label} once after a {siteConfig.freeTrialDays}-day free trial. This page
            does not describe {alt.name}&apos;s prices, features or policies, because they change
            often. To compare the two on offline use, accounts, ads, pricing and data, use the{" "}
            <TextLink href={`${pages.alternatives.path}#criteria`}>six-question checklist</TextLink>{" "}
            against {alt.name}&apos;s current Google Play listing. The same page lists{" "}
            <TextLink href={`${pages.alternatives.path}#who-its-not-for`}>
              who IronBuddy may not suit
            </TextLink>
            .
          </p>
        </ContentSection>

        <ContentSection id="faq" title={`Questions about switching from ${alt.name}`}>
          <FaqList items={faqs} />
          <p>
            {alt.name} is a trademark of its owner. IronBuddy is not affiliated with or endorsed by{" "}
            {alt.name}.
          </p>
        </ContentSection>

        <CtaBanner />

        <RelatedLinks title="Other comparisons" items={[pages.alternatives, ...others]} />
      </PageBody>
    </main>
  );
}
