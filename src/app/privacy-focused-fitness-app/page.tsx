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

export const metadata: Metadata = pageMetadata(pages.privacyFocused);

const faqs: Faq[] = [
  {
    id: "device-access",
    question: "Does IronBuddy access my contacts, location, microphone, or camera?",
    answer:
      "No. According to the privacy policy, IronBuddy does not access your contacts, precise location, microphone, or camera.",
  },
  {
    id: "internet-permission",
    question: "Why does IronBuddy declare an internet permission?",
    answer:
      "The policy says the permission is used by Android's networking stack, for example when you open an external link such as the open-source credits. The app does not use it to upload your workout, body, or personal data.",
  },
];

export default function PrivacyFocusedPage() {
  const crumbs = trail(pages.home, pages.privacyFocused);
  const policy = (fragment: string) => `${pages.privacy.path}#${fragment}`;

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.privacyFocused, { trail: crumbs, about: "app", faqs })} />
      <PageHero
        trail={crumbs}
        eyebrow="Privacy-focused fitness app"
        title="A privacy-focused fitness app that stores your data on your phone"
        updated={pages.privacyFocused.modified}
        lead="IronBuddy is built so your training log belongs to you. There is no account, no IronBuddy server holding your workouts, no ads, and no third-party analytics SDKs. Your sets, body metrics, and notes are stored on your device."
      >
        <HeroCta />
      </PageHero>

      <PageBody>
        <ContentSection id="what-it-stores" title="What IronBuddy stores, and where">
          <p>
            According to the IronBuddy privacy policy, the app keeps the following in on-device
            storage:
          </p>
          <BulletList>
            <li>
              <Strong>Workout information:</Strong> training splits and schedules, exercises, sets,
              reps, weights, history, notes, and progress calculations such as estimated strength
              metrics.
            </li>
            <li>
              <Strong>Body metrics:</Strong> optional body weight and body fat percentage entries.
            </li>
            <li>
              <Strong>Personal info you enter:</Strong> an optional display name and kg or lb unit
              preferences.
            </li>
            <li>
              <Strong>App settings:</Strong> preferences such as theme, units, and whether the
              automatic backup file is on.
            </li>
            <li>
              <Strong>Purchase and trial status:</Strong> when your free trial started and whether
              you unlocked the full app, using a purchase token from Google Play Billing. IronBuddy
              does not receive or store your payment details.
            </li>
          </BulletList>
          <p>
            None of this is uploaded to an IronBuddy server. The policy says IronBuddy does not
            transmit workout logs, body measurements, exercise history, notes, or other fitness
            information to IronBuddy-operated servers (
            <TextLink href={policy("transmission")}>section 8</TextLink>).
          </p>
        </ContentSection>

        <ContentSection id="what-it-does-not-do" title="What IronBuddy does not do">
          <p>As of the policy&apos;s last updated date, IronBuddy does not:</p>
          <BulletList>
            <li>Create user accounts or require sign-in</li>
            <li>Collect data onto IronBuddy-operated servers</li>
            <li>Use advertising SDKs or sell personal data</li>
            <li>Use third-party analytics or crash SDKs that report your workouts to us</li>
            <li>Receive your payment card or billing details, which stay with Google Play</li>
            <li>Access your contacts, precise location, microphone, or camera</li>
          </BulletList>
        </ContentSection>

        <ContentSection id="copies" title="Where copies of your data can exist">
          <p>
            Your data lives on your device, but copies can exist in three ways, all under your
            control or Android&apos;s:
          </p>
          <BulletList>
            <li>
              <Strong>An automatic backup file</Strong> in your Downloads folder, updated whenever your data changes (full version only). You can turn it off in Settings.
            </li>
            <li>
              <Strong>Android Auto Backup</Strong> to your Google account, if Google backup is on
              for your phone. Google and Android manage it; IronBuddy does not receive or access
              these backups.
            </li>
            <li>
              <Strong>Files you export or share,</Strong> such as a JSON copy of your data or a PDF
              of your active split. You choose where they go.
            </li>
          </BulletList>
          <p>
            Once a file is saved or shared, the destination is outside IronBuddy&apos;s control.
            Uninstalling the app does not delete files already saved in Downloads or a backup in
            your Google account. See{" "}
            <TextLink href={policy("backups")}>section 7 of the policy</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="permissions" title="Permissions IronBuddy uses">
          <BulletList>
            <li>
              <Strong>Internet / network,</Strong> used by Android&apos;s networking stack, for
              example when you open an external link. Not used to upload your workout, body, or
              personal data.
            </li>
            <li>
              <Strong>Google Play Billing,</Strong> to complete the in-app purchase.
            </li>
            <li>
              <Strong>Storage / media access,</Strong> to save the backup file and exports in
              Downloads and to read files you choose to import. If you pick a folder with
              Android&apos;s folder picker, the app can access only that folder.
            </li>
          </BulletList>
          <p>
            Exact permission labels vary by Android version. See{" "}
            <TextLink href={policy("permissions")}>section 9 of the policy</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="delete" title="How to delete your data">
          <BulletList>
            <li>
              <Strong>In the app:</Strong> Settings, then Reset All Data, clears what IronBuddy
              stores on the device.
            </li>
            <li>
              <Strong>Uninstall:</Strong> removes the app&apos;s private storage.
            </li>
            <li>
              <Strong>Files you saved:</Strong> the automatic backup file and any JSON or PDF files
              in Downloads are not removed by uninstalling or by Reset All Data. Delete them
              manually if you no longer want those copies.
            </li>
            <li>
              <Strong>Google backup:</Strong> delete it in your phone&apos;s Google backup settings
              or from your Google account.
            </li>
          </BulletList>
          <p>
            Because IronBuddy does not host your workout data on its servers, there is no separate
            cloud account to ask us to delete.
          </p>
        </ContentSection>

        <ContentSection id="check-any-app" title="How to judge any fitness app's privacy">
          <BulletList>
            <li>Read the Data safety section on the app&apos;s Google Play listing.</li>
            <li>Check the permissions it asks for, and whether each one makes sense for the app.</li>
            <li>See whether it requires an account before you can use it.</li>
            <li>Look for export and delete options, so your data is not locked in.</li>
          </BulletList>
          <p>
            Read IronBuddy&apos;s complete{" "}
            <TextLink href={pages.privacy.path}>privacy policy</TextLink>, or use the{" "}
            <TextLink href={pages.contact.path}>contact page</TextLink> with questions.
          </p>
        </ContentSection>

        <ContentSection id="faq" title="Privacy questions">
          <FaqList items={faqs} />
        </ContentSection>

        <CtaBanner />

        <RelatedLinks items={[pages.privacy, pages.offline, pages.faq, pages.about]} />
      </PageBody>
    </main>
  );
}
