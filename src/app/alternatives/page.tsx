import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { onIphone } from "@/lib/iphone";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.alternatives);

/** IronBuddy's answers come from its privacy policy. The "how to check" column works for any app. */
const criteria = [
  {
    check: "Does it work offline?",
    ironbuddy: "Yes. Logging, history, and the exercise library work without a connection.",
    how: "Switch on airplane mode and try to log a workout.",
  },
  {
    check: "Does it require an account?",
    ironbuddy: "No. There is no sign-up or sign-in.",
    how: "Open the app for the first time and see whether it asks you to register before you can log a set.",
  },
  {
    check: "Does it show ads?",
    ironbuddy: "No ads.",
    how: "Look for “Contains ads” under the app's name on Google Play.",
  },
  {
    check: "How is it priced?",
    ironbuddy: `A free trial, then a one-time purchase. No subscription.`,
    how: "Look for “In-app purchases” on Google Play and read what is sold and how it renews.",
  },
  {
    check: "Where does your data live?",
    ironbuddy: "On your device. It is not sent to IronBuddy servers.",
    how: "Read the Data safety section on Google Play and the app's privacy policy.",
  },
  {
    check: "Can you export your history?",
    ironbuddy:
      "Yes, in the full version: a JSON copy of your data and an automatic backup file. A PDF of your active split is available in any version.",
    how: "Look in the app's settings for export or backup options before you log months of data.",
  },
];

const faqs: Faq[] = [
  {
    id: "affiliation",
    question: "Is IronBuddy affiliated with Strong, Hevy, FitNotes, or JEFIT?",
    answer:
      "No. IronBuddy has no affiliation with those products. Their names are trademarks of their respective owners and are used here only to describe what people search for.",
  },
  {
    id: "try-first",
    question: "Can I try IronBuddy before paying?",
    answer: `Yes. IronBuddy is free to download and includes a free trial (currently ${siteConfig.freeTrialDays} days) of the whole workout tracker: logging, every split and exercise, progress charts and body metrics. The full version adds export and import, a local copy of your data, share cards, a customizable Home (arrange and resize your cards) and accent colors. After the trial, a one-time in-app purchase keeps everything unlocked and is required to keep logging and editing.`,
  },
];

export default function AlternativesPage() {
  const crumbs = trail(pages.home, pages.alternatives);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.alternatives, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Alternatives"
        title="Looking for workout app alternatives to Strong, Hevy, FitNotes or JEFIT?"
        updated={pages.alternatives.modified}
        lead={onIphone(
          "If you are comparing workout app alternatives, IronBuddy is a workout tracker for Android and iPhone, for lifters who want offline use, no account, no ads, and no subscription. This page explains who IronBuddy fits, who it does not, and how to compare any workout app on the same criteria.",
          "If you are comparing workout app alternatives, IronBuddy is an Android workout tracker for lifters who want offline use, no account, no ads, and no subscription. This page explains who IronBuddy fits, who it does not, and how to compare any workout app on the same criteria.",
        )}
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <ContentSection id="who-its-for" title="Who IronBuddy is for">
          <BulletList>
            <li>You want to log workouts with no signal or Wi-Fi.</li>
            <li>You would rather not create an account or sign in.</li>
            <li>You do not want ads or a subscription.</li>
            <li>You want your training data stored on your own device.</li>
            <li>{onIphone("You train with an Android phone or an iPhone.", "You train with an Android phone.")}</li>
          </BulletList>
        </ContentSection>

        <ContentSection id="who-its-not-for" title="Who IronBuddy may not be for">
          <BulletList>
            {onIphone(null, <li>You use an iPhone. IronBuddy is Android-only for now.</li>)}
            <li>
              You want automatic cloud sync between devices. IronBuddy does not operate a sync
              service, but you can export a backup and import it on another device you own.
            </li>
            <li>
              You want a social feed, friends, or leaderboards. IronBuddy has no accounts, so it has
              none of these.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="criteria" title="Six questions to ask of any workout app">
          <p>
            Most reasons people look for a different workout tracker come down to the same few
            questions. Here is how IronBuddy answers each one, and how you can check the same thing
            for any app before you commit.
          </p>
          <ul className="space-y-3">
            {criteria.map((item) => (
              <li
                key={item.check}
                className="rounded-2xl border border-white/8 bg-surface p-5"
              >
                <h3 className="text-base font-semibold tracking-tight text-white">{item.check}</h3>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-semibold text-primary">IronBuddy: </span>
                  {item.ironbuddy}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed">
                  <span className="font-semibold text-white">How to check any app: </span>
                  {item.how}
                </p>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection id="by-name" title="Comparing apps by name">
          <p>
            This page does not list other apps&apos; prices, features, or policies. Those change
            often, and stating them here would risk getting them wrong. To compare IronBuddy with
            Strong, Hevy, FitNotes, JEFIT, or any other tracker, run the checks above against each
            app&apos;s current Google Play listing and website.
          </p>
          <p>
            Coming from a specific app? Each of these pages covers one part of IronBuddy in depth
            and the steps for moving over:
          </p>
          <BulletList>
            <li>
              <TextLink href={pages.strongAlternative.path}>Strong alternative</TextLink>: tracking
              1RM (one-rep max), calculated with the Epley formula, plus volume and personal records
            </li>
            <li>
              <TextLink href={pages.hevyAlternative.path}>Hevy alternative</TextLink>: planning your
              week with training splits
            </li>
            <li>
              <TextLink href={pages.fitnotesAlternative.path}>FitNotes alternative</TextLink>:
              backups, exports and moving to a new phone
            </li>
            <li>
              <TextLink href={pages.jefitAlternative.path}>JEFIT alternative</TextLink>: the 800+
              exercise library
            </li>
            <li>
              <TextLink href={pages.boostcampAlternative.path}>Boostcamp alternative</TextLink>:
              logging every set, including drop sets and supersets
            </li>
            <li>
              <TextLink href={pages.caliberAlternative.path}>Caliber alternative</TextLink>: tracking
              body weight and body fat alongside your lifts
            </li>
          </BulletList>
          <p>
            Want the facts side by side? The{" "}
            <TextLink href={pages.comparison.path}>Android workout tracker comparison</TextLink> sets
            these six apps and IronBuddy next to each other, using each app&apos;s Google Play page and
            official pricing page.
          </p>
          <p>
            Strong, Hevy, FitNotes, JEFIT, Boostcamp, and Caliber are trademarks of their respective owners. IronBuddy is
            not affiliated with or endorsed by them.
          </p>
        </ContentSection>

        <ContentSection id="switching" title="Switching from another app">
          <p>
            Before you move away from any app, export your history if the app allows it and keep the
            file as an archive. In IronBuddy you can start a fresh log from today. Your current
            working weights on the main lifts are usually enough to pick up where you left off, and
            our guide to{" "}
            <TextLink href={pages.logWorkouts.path}>logging your workouts</TextLink> covers what is
            worth recording.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Questions about switching">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks
          items={[pages.offline, pages.noSubscription, pages.privacyFocused, pages.features]}
        />
      </PageBody>
    </main>
  );
}
