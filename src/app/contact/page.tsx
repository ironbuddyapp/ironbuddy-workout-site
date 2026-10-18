import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.contact);

export default function ContactPage() {
  const crumbs = trail(pages.home, pages.contact);

  return (
    <main id="main">
      <JsonLd
        data={pageGraph(pages.contact, {
          type: "ContactPage",
          trail: crumbs,
          about: "organization",
        })}
      />
      <PageHero
        trail={crumbs}
        eyebrow="Contact"
        title="Contact IronBuddy"
        updated={pages.contact.modified}
        lead={`For app support, feedback, or privacy questions, write to ${siteConfig.contactEmail}. The details below help us answer faster.`}
      />

      <PageBody>
        <div className="rounded-3xl border border-white/8 bg-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Email</p>
          <p className="mt-3 select-all break-all text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {siteConfig.contactEmail}
          </p>
        </div>

        <ContentSection id="what-to-include" title="What to include">
          <p>A few details help us answer faster:</p>
          <BulletList>
            <li>
              What you are writing about: a problem, a suggestion, or a question about your data
            </li>
            <li>Your phone model and Android version</li>
            <li>The IronBuddy version you have installed</li>
            <li>What you expected, what happened, and the steps that led to it</li>
          </BulletList>
          <p>
            Please do not send passwords or unnecessary personal documents. A screenshot is fine if
            it helps; check that it does not show anything private.
          </p>
        </ContentSection>

        <ContentSection id="what-we-can-help-with" title="What we can and cannot help with">
          <BulletList>
            <li>
              <Strong>Lost workouts:</Strong> IronBuddy keeps no copy of your workouts on any
              IronBuddy server, so we cannot restore a lost log. A backup file, or Android&apos;s own
              backup if it was turned on, is how a log comes back. See{" "}
              <TextLink href={`${pages.offline.path}#backups`}>how backups work</TextLink>.
            </li>
            <li>
              <Strong>Payments:</Strong> Google Play processes the purchase and holds your payment
              details. IronBuddy never receives your card or billing details. See the{" "}
              <TextLink href={`${pages.privacy.path}#purchases`}>purchases section</TextLink> of the
              privacy policy.
            </li>
            <li>
              <Strong>Privacy questions:</Strong> the{" "}
              <TextLink href={pages.privacy.path}>privacy policy</TextLink> explains what the app
              handles. Write to us if anything is unclear.
            </li>
          </BulletList>
        </ContentSection>

        <RelatedLinks items={[pages.faq, pages.about, pages.privacy, pages.offline]} />
      </PageBody>
    </main>
  );
}
