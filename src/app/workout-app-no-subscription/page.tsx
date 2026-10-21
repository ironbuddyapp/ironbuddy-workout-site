import type { Metadata } from "next";
import {
  BulletList,
  ContentSection,
  NumberedList,
  PageBody,
  Strong,
  TextLink,
} from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { trialDetails } from "@/lib/content";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.noSubscription);

const trial = `${siteConfig.freeTrialDays} days`;

const faqs: Faq[] = [
  {
    id: "cost",
    question: "How much does IronBuddy cost?",
    answer: `The download is free and includes a free trial (currently ${trial}). After the trial you pay once, a one-time purchase through Google Play, which shows the price for your country.`,
  },
  {
    id: "in-app-purchases",
    question: "Does IronBuddy have in-app purchases?",
    answer: `Yes, one: a single one-time purchase, required to keep logging and editing after the free trial. IronBuddy has no subscriptions. Google Play handles the purchase, so the app never receives your payment card or billing details.`,
  },
];

export default function NoSubscriptionPage() {
  const crumbs = trail(pages.home, pages.noSubscription);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.noSubscription, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="No subscription, no ads"
        title="A workout tracker app with no subscription and no ads"
        updated={pages.noSubscription.modified}
        lead={`IronBuddy has no subscription and no ads. It is free to download with a free trial (currently ${trial}). After the trial, a one-time in-app purchase through Google Play is required to keep logging and editing.`}
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <ContentSection id="pricing" title="How IronBuddy pricing works">
          <NumberedList>
            <li>Download IronBuddy from Google Play. The download is free.</li>
            <li>
              Use the free trial to see whether the app fits how you train.{" "}
              {trialDetails.includes}
            </li>
            <li>
              To keep logging and editing after the trial, make a one-time in-app purchase
              on Google Play. It unlocks every split, the full library of 800+ exercises,
              and your own custom splits. There is no subscription and no renewal date.
            </li>
          </NumberedList>
          <p>{trialDetails.afterTrial}</p>
          <p>
            Google Play handles the purchase. IronBuddy never sees your card or billing details, and
            it only stores confirmation that the purchase exists so it can unlock the app. Google Play
            shows the final amount for your country, which can differ slightly with currency and
            tax. The{" "}
            <TextLink href={`${pages.privacy.path}#purchases`}>purchases section of the privacy policy</TextLink>{" "}
            has the details.
          </p>
        </ContentSection>

        {/* Google Trends: the top related search for "no subscription" workout apps is "free workout apps no
            subscription". This answers that searcher honestly instead of implying IronBuddy is free. */}
        <ContentSection id="free" title="Looking for a free workout app?">
          <p>
            Many people searching for a workout app with no subscription want one that costs nothing
            at all. IronBuddy is not free: it is free to download with a{" "}
            {siteConfig.freeTrialDays}-day free trial, and after that a one-time purchase
            is required to keep logging and editing.
          </p>
          <p>
            What you get for that one payment is an app with no subscription, no renewal, no ads and
            no account, and a training log that is stored on your phone. Use the trial to decide
            whether that is worth it to you before you pay anything.
          </p>
        </ContentSection>

        <ContentSection id="no-subscription" title="What “no subscription” means">
          <p>
            No monthly or yearly plan, no renewal date, and no payment that needs cancelling.
            IronBuddy&apos;s privacy policy states plainly that there are no subscriptions.
          </p>
          <p>
            A training log is something you keep for years, so it helps when opening your history
            never depends on an active plan.
          </p>
        </ContentSection>

        <ContentSection id="no-ads" title="What “no ads” means">
          <p>
            IronBuddy shows no ads. Its privacy policy also says the app does not include
            advertising SDKs or third-party analytics SDKs, so nothing competes for your attention
            between sets.
          </p>
          <p>
            Ad networks typically rely on device identifiers and usage data to target ads. An app
            with no advertising SDKs has no need to share your data that way. See{" "}
            <TextLink href={pages.privacyFocused.path}>how IronBuddy handles your data</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="check-any-app" title="How to check any workout app for ads and subscriptions">
          <p>
            These checks take a few minutes and work for any app, including IronBuddy. Do them
            before you commit.
          </p>
          <BulletList>
            <li>
              <Strong>Google Play labels:</Strong> look for “Contains ads” and “In-app purchases”
              under the app&apos;s name, and read what the in-app purchases are.
            </li>
            <li>
              <Strong>Data safety:</Strong> the Data safety section lists what data an app collects
              or shares.
            </li>
            <li>
              <Strong>Sign-in wall:</Strong> install the app and open it. If it asks you to create
              an account before you can log a workout, an account is required.
            </li>
            <li>
              <Strong>Trial terms:</Strong> find out what happens when a trial ends and what you
              lose if you stop paying, especially access to your own history.
            </li>
            <li>
              <Strong>Export:</Strong> check whether you can export your workout history to a file
              you keep.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="faq" title="Pricing questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.comparison, pages.alternatives, pages.features, pages.faq]} />
      </PageBody>
    </main>
  );
}
