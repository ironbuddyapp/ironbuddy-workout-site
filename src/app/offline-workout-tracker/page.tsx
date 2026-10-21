import type { Metadata } from "next";
import { BulletList, ContentSection, PageBody, Strong, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import type { Faq } from "@/lib/content";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.offline);

const faqs: Faq[] = [
  {
    id: "buy-or-restore",
    question: "Do I need internet to buy or restore IronBuddy?",
    answer:
      "Getting the app, updating it, and completing or restoring the one-time purchase all go through Google Play, so those steps need a connection. IronBuddy stores your purchase and trial status on your device. Logging workouts does not need a connection.",
  },
  {
    id: "sync",
    question: "Does IronBuddy sync between devices?",
    answer:
      "No. IronBuddy does not operate a cloud sync service. To move your log to another device you own, use the full version to export a backup file and import it there.",
  },
  {
    id: "library-offline",
    question: "Does the exercise library need an internet connection?",
    answer:
      "No. You can search the exercise library, filter by muscle group and equipment, and view demonstrations without a connection.",
  },
];

export default function OfflineWorkoutTrackerPage() {
  const crumbs = trail(pages.home, pages.offline);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.offline, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Offline workout app"
        title="Offline workout tracker for Android: no signal, no Wi-Fi, no login"
        updated={pages.offline.modified}
        lead="IronBuddy is an offline workout tracker for Android, built offline-first. You can log sets, reps, and weight, review your history, and browse the exercise library with no signal, no Wi-Fi, and no login, because your training log is stored on your phone rather than on a server."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <ContentSection id="works-offline" title="What works without an internet connection">
          <p>
            Everything you use during a workout is stored on your phone, so it keeps working in a
            basement gym, on a plane, or anywhere the signal drops.
          </p>
          <BulletList>
            <li>Logging sets, reps, weight, and notes for any workout, today or on a past date</li>
            <li>Your workout history and weekly plan</li>
            <li>Training splits and templates</li>
            <li>Progress charts for training volume, 1RM (one-rep max), calculated with the Epley formula, and body metrics</li>
            <li>
              The exercise library, including search, muscle-group and equipment filters, and
              demonstration thumbnails
            </li>
          </BulletList>
          <p>
            See every screen in the{" "}
            <TextLink href={pages.features.path}>IronBuddy feature tour</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="needs-internet" title="What does need an internet connection">
          <p>A few steps go through Google Play or the web, not through IronBuddy:</p>
          <BulletList>
            <li>Downloading and updating the app from Google Play</li>
            <li>
              Completing the one-time purchase, and checking or restoring it after a reinstall
            </li>
            <li>Opening an external link from the app, such as the open-source credits</li>
          </BulletList>
          <p>
            IronBuddy declares Android&apos;s internet permission for those cases. According to its
            privacy policy, the app does not use it to upload your workout, body, or personal data.
            The details are in the{" "}
            <TextLink href={`${pages.privacy.path}#permissions`}>permissions section of the policy</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="offline-first" title="Offline-first versus “offline mode”">
          <p>
            Some apps offer an offline mode that still depends on an account and a server: you log
            workouts on your phone and they sync when you are back online. Offline-first is
            different. The copy on your phone is the real one, and nothing has to sync for it to be
            complete.
          </p>
          <p>
            IronBuddy has no IronBuddy account and does not operate a cloud sync backend for your
            workouts, so there is nothing to sign in to and nothing waiting to upload. The trade-off
            is that you are responsible for backups, covered below.
          </p>
        </ContentSection>

        <ContentSection id="why-offline" title="Why offline matters at the gym">
          <BulletList>
            <li>
              <Strong>Reception:</Strong> basements, garages, and concrete-walled gyms often have
              weak signal or no Wi-Fi.
            </li>
            <li>
              <Strong>Travel:</Strong> hotel gyms and gyms abroad, where you may not want to use
              roaming data.
            </li>
            <li>
              <Strong>Speed:</Strong> logging does not depend on a network request, so saving a set
              is never held up by a slow connection.
            </li>
            <li>
              <Strong>Ownership:</Strong> your history is not tied to an account that could be
              closed or a service that could change its terms.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="backups" title="Keep your offline log safe">
          <p>
            Because your workouts are stored on your device, backups matter. IronBuddy gives you three layers (the first and third are part of the full version):
          </p>
          <BulletList>
            <li>
              <Strong>An automatic backup file:</Strong> each time your data changes, IronBuddy saves
              an up-to-date JSON copy in your Downloads folder
              (Download/IronBuddy/ironbuddy-backup.json). You can turn this off in Settings, under
              Data → Backup.
            </li>
            <li>
              <Strong>Android Auto Backup:</Strong> if Google backup is turned on for your phone,
              Android may back up certain app data to your Google account. Google and Android manage
              this, not IronBuddy.
            </li>
            <li>
              <Strong>Manual export:</Strong> share a JSON copy of your data, or a PDF of your active
              split, wherever you choose. To move to a new phone you own, import a backup file there.
            </li>
          </BulletList>
          <p>
            Uninstalling the app removes its private storage, but not files already saved in
            Downloads or a backup in your Google account. Read the full{" "}
            <TextLink href={`${pages.privacy.path}#backups`}>backups and exports section</TextLink>{" "}
            of the privacy policy.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Offline tracking questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks
          items={[pages.features, pages.privacyFocused, pages.faq, pages.logWorkouts]}
        />
      </PageBody>
    </main>
  );
}
