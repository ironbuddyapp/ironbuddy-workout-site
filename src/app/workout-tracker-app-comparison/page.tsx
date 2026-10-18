import type { Metadata } from "next";
import { Callout, ContentSection, PageBody, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FactsTable } from "@/components/FactsTable";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { checkedOn, comparedApps } from "@/lib/comparison";
import { formatDate } from "@/lib/format";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.comparison);

export default function ComparisonPage() {
  const crumbs = trail(pages.home, pages.comparison);
  const checked = formatDate(checkedOn);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.comparison, { trail: crumbs, about: "app" })} />
      <PageHero
        trail={crumbs}
        eyebrow="Comparison"
        title="Android workout tracker apps compared"
        updated={pages.comparison.modified}
        lead={`The facts about IronBuddy and six popular Android workout trackers (Hevy, Strong, FitNotes, JEFIT, Boostcamp and Caliber), taken from their Google Play pages and official pricing pages on ${checked}. This page states what those pages say. It does not rank the apps.`}
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <Callout title="How to read this page">
          <p>
            Every fact about another app comes from its own Google Play page or official site, was
            checked on {checked}, and links to its source. Google Play shows what each developer
            declares, so the labels below describe what the developers say, not what we have
            tested. Prices and store labels change, and Google Play can show different prices in
            different countries, so check the app&apos;s own page before you decide.
          </p>
        </Callout>

        <ContentSection id="google-play" title="What each app declares on Google Play">
          <p>
            Read from each app&apos;s US English Google Play page on {checked}. The ads and data
            safety rows are the developer&apos;s own declarations.
          </p>
          <FactsTable
            caption={`Google Play facts for IronBuddy, Hevy, Strong, FitNotes, JEFIT, Boostcamp and Caliber, checked on ${checked}`}
            columns={["App", "In-app purchases", "Ads label", "Data collected", "Data shared", "Last updated"]}
            rows={comparedApps.map((app) => ({
              id: app.id,
              highlight: app.id === "ironbuddy",
              cells: [
                <TextLink key="name" href={app.playUrl}>
                  {app.name}
                </TextLink>,
                app.play.inAppPurchases,
                app.play.adsLabel,
                app.play.dataCollected,
                app.play.dataShared,
                app.play.lastUpdated,
              ],
            }))}
          />
          <p>
            &quot;Ads label&quot; means the &quot;Contains ads&quot; label Google Play shows under an
            app&apos;s name. &quot;Data collected&quot; and &quot;Data shared&quot; are from the Data
            safety section. &quot;In-app purchases&quot; is the label Google Play shows under the
            app&apos;s name.
          </p>
        </ContentSection>

        <ContentSection id="pricing" title="What each app says about price">
          <p>
            From each app&apos;s own pages on {checked}. Where a page does not list a price, this
            table does not guess one.
          </p>
          <FactsTable
            caption={`Pricing statements from the official pages of IronBuddy, Hevy, Strong, FitNotes, JEFIT, Boostcamp and Caliber, checked on ${checked}`}
            columns={["App", "What its pages say", "Source"]}
            rows={comparedApps.map((app) => ({
              id: app.id,
              highlight: app.id === "ironbuddy",
              cells: [
                app.name,
                app.pricing.text,
                <span key="sources" className="flex flex-col gap-1">
                  {app.pricing.sources.map((source) => (
                    <TextLink key={source.href} href={source.href}>
                      {source.label}
                    </TextLink>
                  ))}
                </span>,
              ],
            }))}
          />
        </ContentSection>

        <ContentSection id="not-covered" title="What this page does not tell you">
          <p>
            Ratings, exercise libraries, social features, watch apps and training programs are not
            compared here. They are matters of taste or change often, and Google Play and each app&apos;s
            own site are the best places to read them. Each app below has a page that explains what
            IronBuddy covers and how to move your history across:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {comparedApps
              .filter((app) => app.page)
              .map((app) => (
                <li key={app.id}>
                  <TextLink href={app.page as string}>{app.name} alternative</TextLink>
                </li>
              ))}
          </ul>
          <p>
            The page for each app states facts about IronBuddy only. For the other app, use the
            sources linked in the tables above.
          </p>
        </ContentSection>

        <ContentSection id="about-this-page" title="About these names">
          <p>
            Hevy, Strong, FitNotes, JEFIT, Boostcamp and Caliber are trademarks of their respective
            owners. IronBuddy is not affiliated with or endorsed by them. The names are used only
            to say which apps the facts above are about. If something on this page is out of date
            or wrong, please tell us through the <TextLink href={pages.contact.path}>contact page</TextLink>{" "}
            and we will check it and fix it.
          </p>
        </ContentSection>

        <CtaBanner />

        <RelatedLinks
          items={[pages.alternatives, pages.noSubscription, pages.privacyFocused, pages.features]}
        />
      </PageBody>
    </main>
  );
}
