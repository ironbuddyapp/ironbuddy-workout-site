import type { Metadata } from "next";
import { BulletList, Code, ContentSection, PageBody, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { KeyFacts } from "@/components/KeyFacts";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { onIphone } from "@/lib/iphone";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.about);

export default function AboutPage() {
  const crumbs = trail(pages.home, pages.about);
  const email = siteConfig.contactEmail;

  return (
    <main id="main">
      <JsonLd
        data={pageGraph(pages.about, { type: "AboutPage", trail: crumbs, about: "organization" })}
      />
      <PageHero
        trail={crumbs}
        eyebrow="About"
        title="About IronBuddy: Workout Tracker"
        updated={pages.about.modified}
        lead={onIphone(
          "IronBuddy: Workout Tracker is an app for Android and iPhone for planning and logging gym workouts. It is designed around one idea: your training data belongs to you.",
          "IronBuddy: Workout Tracker is an Android app for planning and logging gym workouts. It is designed around one idea: your training data belongs to you.",
        )}
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <KeyFacts
          id="at-a-glance"
          title="IronBuddy at a glance"
          items={[
            { term: "What it is", detail: "A local workout planning and logging app." },
            {
              term: "Platform",
              detail: onIphone(
                "Android, distributed on Google Play, and iPhone, distributed on the App Store.",
                "Android, distributed on Google Play. Not available on iPhone yet.",
              ),
            },
            { term: "Android package", detail: <Code>{siteConfig.playStoreId}</Code> },
            ...onIphone([{ term: "iPhone bundle ID", detail: <Code>com.ironbuddy.app</Code> }], []),
            {
              term: "Pricing",
              detail: `Free to download with a ${siteConfig.freeTrialDays}-day free trial of the whole workout tracker: logging, every split and exercise, progress charts and body metrics. The full version adds export and import, a local copy of your data, share cards, a customizable Home (arrange and resize your cards) and accent colors. After the trial, a one-time in-app purchase keeps everything unlocked and is required to keep logging and editing. No subscription.`,
            },
            { term: "Ads and analytics", detail: "No ads and no third-party analytics SDKs." },
            { term: "Account", detail: "None. There is no sign-up or sign-in." },
            {
              term: "Your data",
              detail: "Stored on your device and not sent to IronBuddy servers.",
            },
            {
              term: "Privacy policy",
              detail: <TextLink href={pages.privacy.path}>Read the IronBuddy privacy policy</TextLink>,
            },
            {
              term: "Contact",
              detail: (
                <>
                  {email} · <TextLink href={pages.contact.path}>Contact page</TextLink>
                </>
              ),
            },
            { term: "Website", detail: siteConfig.url.replace("https://", "") },
          ]}
        />

        <ContentSection id="what-it-does" title="What IronBuddy does">
          <p>
            IronBuddy helps you log sets, reps, weight, and notes for every workout, follow a
            training split, chart training volume and 1RM (one-rep max), calculated with the Epley formula, and track body weight and body
            fat percentage. An exercise library of more than 800 exercises with demonstrations helps
            you pick the right movement, and it all works offline.
          </p>
          <p>
            See the <TextLink href={pages.features.path}>full feature tour</TextLink> with
            screenshots.
          </p>
        </ContentSection>

        <ContentSection id="how-it-handles-data" title="How IronBuddy handles your data">
          <p>
            {onIphone(
              "Your workouts, body metrics, notes, and settings are stored on your device. IronBuddy has no account system and does not operate a cloud sync service, so your training data is not sent to IronBuddy servers. Copies can exist only in ways you control or your phone provides: Android Auto Backup if you have Google backup turned on, iCloud Backup on iPhone if it is turned on and, in the full version, an automatic backup file and files you export or share.",
              "Your workouts, body metrics, notes, and settings are stored on your device. IronBuddy has no account system and does not operate a cloud sync service, so your training data is not sent to IronBuddy servers. Copies can exist only in ways you control or Android provides: Android Auto Backup if you have Google backup turned on and, in the full version, an automatic backup file and files you export or share.",
            )}
          </p>
          <p>
            Read the plain-language overview,{" "}
            <TextLink href={pages.privacyFocused.path}>a privacy-focused fitness app</TextLink>, or
            the complete <TextLink href={pages.privacy.path}>privacy policy</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="how-it-is-paid-for" title="How IronBuddy is priced">
          <p>
            {onIphone(
              "IronBuddy has no ads and no subscriptions. It is free to download with a free trial, and after the trial a one-time in-app purchase through Google Play or the App Store is required to keep logging and editing after the trial. Details are on the",
              "IronBuddy has no ads and no subscriptions. It is free to download with a free trial, and after the trial a one-time in-app purchase through Google Play is required to keep logging and editing after the trial. Details are on the",
            )}{" "}
            <TextLink href={pages.noSubscription.path}>no subscription, no ads</TextLink> page.
          </p>
        </ContentSection>

        <ContentSection id="health-notice" title="Health and fitness notice">
          <p>
            IronBuddy is a fitness logging and planning tool. It is not a medical device and does
            not diagnose, treat, cure, or prevent any medical condition. Progress charts and
            estimated strength figures are informational calculations based on the data you enter,
            not clinical advice. Consult a qualified healthcare professional for medical advice.
          </p>
        </ContentSection>

        <ContentSection id="contact" title="Contact and follow">
          <p>
            For support or privacy questions, use the{" "}
            <TextLink href={pages.contact.path}>contact page</TextLink> or write to {email}. Please
            do not send passwords or unnecessary personal documents.
          </p>
          <BulletList>
            <li>
              <TextLink href={siteConfig.instagramUrl}>IronBuddy on Instagram</TextLink>
            </li>
            <li>
              <TextLink href={siteConfig.tiktokUrl}>IronBuddy on TikTok</TextLink>
            </li>
            <li>
              <TextLink href={siteConfig.githubUrl}>IronBuddy on GitHub</TextLink>
            </li>
          </BulletList>
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.features, pages.privacy, pages.faq, pages.guides]} />
      </PageBody>
    </main>
  );
}
