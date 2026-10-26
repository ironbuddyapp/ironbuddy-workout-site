import type { Metadata } from "next";
import {
  BulletList,
  Code,
  ContentSection,
  PageBody,
  Strong,
  TextLink,
} from "@/components/content";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.privacy);

/*
 * This page IS IronBuddy's privacy policy: the app links here (Settings → About → Privacy Policy) and Play Console uses
 * this URL. Change the wording here and bump `pages.privacy.modified` in src/lib/pages.ts. (The old GitHub repo
 * ironbuddyapp/ironbuddy-privacy-policy was a workaround from before this website and is no longer used.)
 *
 * Exception: the notes about GoatCounter (summary, section 6 and section 13) are about this website only and are
 * not in the policy repo, because the app itself has no analytics.
 */

const googlePrivacyUrl = "https://policies.google.com/privacy";
const applePrivacyUrl = "https://www.apple.com/legal/privacy/";

const contents = [
  ["summary", "1. Summary"],
  ["applies-to", "2. Who this policy applies to"],
  ["data-on-device", "3. Data stored on your device"],
  ["purchases", "4. Purchases and payment processing"],
  ["review-prompts", "5. In-app review prompts"],
  ["not-collected", "6. Data we do not collect"],
  ["backups", "7. Backups, exports, and sharing"],
  ["transmission", "8. Data handling and transmission"],
  ["permissions", "9. Permissions"],
  ["deleting-data", "10. How you can delete data"],
  ["health-notice", "11. Health and fitness notice"],
  ["children", "12. Children"],
  ["third-party", "13. Third-party services"],
  ["changes", "14. Changes to this policy"],
  ["contact", "15. Contact"],
] as const;

function GooglePolicyLink() {
  return <TextLink href={googlePrivacyUrl}>Google Play&apos;s own Privacy Policy</TextLink>;
}

function ApplePolicyLink() {
  return <TextLink href={applePrivacyUrl}>Apple&apos;s Privacy Policy</TextLink>;
}

export default function PrivacyPage() {
  const email = siteConfig.contactEmail;

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.privacy, { trail: trail(pages.home, pages.privacy) })} />
      <PageHero
        trail={trail(pages.home, pages.privacy)}
        eyebrow="Legal"
        title="IronBuddy Privacy Policy"
        updated={pages.privacy.modified}
        lead={
          <>
            IronBuddy: Workout Tracker (“the App”, “we”, “us”) is a local workout planning and logging app. This
            Privacy Policy describes what information the App handles, how it is stored, and what
            we do <em>not</em> collect. It is intended to meet Google Play and Apple App Store requirements for health
            and fitness apps, including clear disclosure of on-device data, automatic backups, and
            user-initiated exports.
          </>
        }
      >
        <dl className="space-y-1 text-sm text-muted">
          <div>
            <dt className="inline font-medium text-white">App: </dt>
            <dd className="inline">
              IronBuddy: Workout Tracker (Android package <Code>{siteConfig.playStoreId}</Code>; iPhone bundle ID <Code>com.ironbuddy.app</Code>)
            </dd>
          </div>
          <div>
            <dt className="inline font-medium text-white">Contact: </dt>
            <dd className="inline">
              <TextLink href={`mailto:${email}`}>{email}</TextLink>
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          Prefer a plain-language overview? Read{" "}
          <TextLink href={pages.privacyFocused.path}>how IronBuddy keeps your data on your phone</TextLink>.
        </p>
      </PageHero>

      <PageBody>
        <nav aria-label="Policy contents">
          <ol className="grid gap-x-8 gap-y-1 rounded-3xl border border-white/8 bg-surface px-5 py-4 text-sm sm:grid-cols-2 sm:px-7">
            {contents.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-block py-1.5 text-muted transition hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ContentSection id="summary" title="1. Summary">
          <BulletList>
            <li>
              Workout and fitness data you enter is stored on your device. IronBuddy does not send
              it to any IronBuddy server.
            </li>
            <li>
              No IronBuddy account is required and we do not operate a cloud sync backend for your
              workouts.
            </li>
            <li>We do not sell personal data.</li>
            <li>The App does not include ads or third-party analytics SDKs.</li>
            <li>
              This website, workout.ironbuddy.fit (not the App), uses GoatCounter to count page views and
              referrers, without cookies and without storing IP addresses (see section 13).
            </li>
            <li>
              IronBuddy is free to download and includes a 7-day free trial. During the trial you can log, plan and track everything. These come with the full version: exporting and importing your data, the backup file (Download/IronBuddy on Android, the Files app on iPhone), share images, and customizations (arranging and resizing your Home widgets, and choosing an accent color). Choosing how the Home calendar looks works in both the trial and the full version. Android’s own backup (and iCloud Backup on iPhone) works in both the trial and the full version. After the trial your data stays visible, and a one-time in-app purchase is required to keep logging and editing. The purchase is handled entirely by
              Google Play on Android and by the Apple App Store on iPhone (see section 4).
            </li>
            <li>
              Copies of your data can exist outside the App’s private storage, all explained in section 7. On
              Android: an automatic backup file in Download/IronBuddy (full version only), and Android’s own
              backup to your Google account, if Google backup is turned on. On iPhone: your iPhone’s iCloud
              Backup, if it is turned on, and, in the full version, an automatic backup file in the Files app
              (On My iPhone → IronBuddy, or an iCloud Drive folder you choose). On both, in the full version:
              files you choose to export or share.
            </li>
          </BulletList>
        </ContentSection>

        <ContentSection id="applies-to" title="2. Who this policy applies to">
          <p>
            This policy applies to users of the IronBuddy Android application distributed on Google
            Play and the IronBuddy iPhone application distributed on the Apple App Store (and their
            testing channels, such as TestFlight). It covers data processed by the App on your device.
            It does not cover Google Play, the App Store, Android’s backup service, iCloud, or
            third-party apps or services you later send files to (for example email, Google Drive,
            iCloud Drive, or messaging apps).
          </p>
        </ContentSection>

        <ContentSection id="data-on-device" title="3. Data stored on your device">
          <p>
            The App stores information you provide or generate while using it in on-device storage
            (application storage / local storage). Depending on how you use IronBuddy, this may
            include:
          </p>
          <BulletList>
            <li>
              <Strong>Fitness / workout information:</Strong> training splits and schedules,
              exercises, sets, reps, weights, workout history, notes, and progress-related
              calculations (for example estimated strength metrics derived from your logged lifts).
            </li>
            <li>
              <Strong>Health and fitness data:</Strong> body weight and body fat percentage entries
              (optional), and workout/training logs.
            </li>
            <li>
              <Strong>Personal info you enter:</Strong> an optional display name and unit
              preferences (kg/lb).
            </li>
            <li>
              <Strong>App settings:</Strong> preferences such as theme, units, how the Home calendar looks, and whether the
              automatic backup file is turned on; in the full version, also your customizations: the
              layout and sizes of your Home widgets and your accent color. They stay on your device and
              are included when you export a copy.
            </li>
            <li>
              <Strong>Purchase and trial status:</Strong> the date your free trial started, the latest time
              the App has seen (so that setting the device’s date back doesn’t extend the trial), and
              whether you have unlocked the full app. On Android this includes a purchase verification
              token provided by Google Play Billing; on iPhone, the App Store transaction identifier and
              the date of your free trial item. These let the App verify and restore your entitlement.
              They are stored on your device. The App does not receive or store your payment details.
            </li>
          </BulletList>
          <p>
            This information is used only to provide App features (planning workouts, logging
            sessions, showing progress charts, backups you can restore from, and unlocking the full
            app). We do not receive this data on IronBuddy servers because the App does not upload
            your training data to an IronBuddy cloud service.
          </p>
        </ContentSection>

        <ContentSection id="purchases" title="4. Purchases and payment processing">
          <p>
            IronBuddy is free to download and use for a free trial period (currently 7 days), during which you can log, plan and track everything. Exporting and importing your data, the backup file (Download/IronBuddy on Android, the Files app on iPhone), share images, and customizations (arranging and resizing your Home widgets, and choosing an accent color) come with the full version. Android’s own backup (and iCloud Backup on iPhone) works in both the trial and the full version. After the trial your data stays visible, and logging and editing need the one-time in-app purchase; there are no
            subscriptions. On Android, the purchase is made and processed entirely by Google Play
            using Google Play Billing. The App receives from Google Play only confirmation that the
            purchase exists (the product identifier and a purchase token) and stores it on your
            device so it can unlock features and check your purchase again when you open the App or
            reinstall it. The App does not receive, access, or store your payment card, billing
            address, or other payment details. The trial start date is kept on your device.
          </p>
          <p>
            For details on how Google Play handles your payment data, see <GooglePolicyLink />.
          </p>
          <p>
            <Strong>On iPhone</Strong>, purchases are made and processed entirely by the Apple App
            Store. The free trial is a free in-app item (“7-day Trial”) that the App Store records on
            your Apple ID; the App reads the date you obtained it to know when your trial started, which
            also means reinstalling the App does not restart the trial. The one-time unlock is a
            separate in-app purchase. The App receives from the App Store only confirmation that these
            items exist on your Apple ID (the product identifier, a transaction identifier and the
            date), checked again when you open the App. The App does not receive, access, or store your
            payment card, billing address, Apple ID password, or other payment details. For details on
            how Apple handles your data, see <ApplePolicyLink />.
          </p>
        </ContentSection>

        <ContentSection id="review-prompts" title="5. In-app review prompts">
          <p>
            IronBuddy may occasionally prompt you to rate the app using Google Play&apos;s built-in
            review feature. This prompt is displayed and processed entirely by Google Play —
            IronBuddy does not receive, access, or store any information about whether you viewed,
            completed, or dismissed a review prompt, nor the content of any review you submit. For
            details on how Google Play handles this, see <GooglePolicyLink />.
          </p>
          <p>
            On iPhone, IronBuddy may occasionally ask iOS to show Apple’s built-in rating prompt. iOS
            decides whether the prompt appears (at most three times a year), and you can turn such
            prompts off in Settings → App Store. IronBuddy does not receive or store whether you saw,
            completed, or dismissed the prompt, nor any rating or review you submit.
          </p>
          <p>
            The iPhone App also has an “Enjoying IronBuddy?” card in Settings. Tapping it opens the App’s
            Write a Review page on the App Store; it is a plain link, not the rating prompt. IronBuddy does not receive or store whether you opened it, nor any rating or review
            you submit.
          </p>
        </ContentSection>

        <ContentSection id="not-collected" title="6. Data we do not collect">
          <p>As of the last updated date above, IronBuddy does not:</p>
          <BulletList>
            <li>Create user accounts or require sign-in</li>
            <li>Collect data onto IronBuddy-operated servers</li>
            <li>Use advertising SDKs or sell personal data</li>
            <li>Use third-party analytics / crash SDKs that report your workouts to us</li>
            <li>Receive your payment card or billing details (these stay with Google Play or the App Store)</li>
            <li>Access your contacts, precise location, microphone, or camera</li>
          </BulletList>
          <p>
            This list is about the App. The website workout.ironbuddy.fit uses GoatCounter to count page
            views and referrers, as described in section 13.
          </p>
        </ContentSection>

        <ContentSection id="backups" title="7. Backups, exports, and sharing">
          <p>Copies of your data can exist in these ways:</p>
          <BulletList>
            <li>
              <Strong>Automatic backup file (on your device):</Strong> in the full version, each time your data changes, the App saves one up-to-date JSON copy of it at
              Download/IronBuddy/ironbuddy-backup.json, replacing the previous copy — the App does
              not keep numbered copies. The file stays on your device; it can be read by you and by
              other apps you allow to access your files. You can turn this off in Settings → Data → Backup. After reinstalling the App, Android may ask you to choose the IronBuddy
              folder once so the App can replace the file left by the earlier installation; the App
              uses only the folder you choose.
            </li>
            <li>
              <Strong>Android Auto Backup (Google account):</Strong> IronBuddy allows Android’s
              built-in Auto Backup feature. If backup is enabled on your Android device, the Android
              operating system may create an encrypted backup of certain App data and store it in
              your Google account. This backup is managed entirely by Google and Android. IronBuddy
              does not receive, access, view, process, or control these backups. Android may use the
              backup to restore your data when reinstalling the App or setting up a new device. You
              can disable Android backups or remove existing backups through your device’s Google
              Backup settings.
            </li>
            <li>
              <Strong>Automatic backup file (iPhone):</Strong> in the full version, each time your data
              changes, the App saves one up-to-date JSON copy of it, ironbuddy-backup.json, replacing the
              previous copy. By default it is kept in the App’s own folder, which the Files app shows as
              On My iPhone → IronBuddy; iOS deletes this folder when you delete the App. You can instead
              choose a folder with the iOS folder picker (for example in iCloud Drive); the App then keeps
              the file there and can access only the folder you chose. A file in iCloud Drive is stored and
              synced by Apple in your own iCloud account; IronBuddy does not receive or access it on any
              server. You can turn the file off, or move it back to the iPhone, in Settings → Backup.
            </li>
            <li>
              <Strong>iCloud Backup (iPhone):</Strong> if iCloud Backup is turned on, iOS includes the
              App’s data in your iPhone’s backup in your iCloud account, and can restore it when you set up
              a new iPhone from that backup. This backup is made and managed entirely by Apple and iOS;
              IronBuddy does not receive, access, or control it.
            </li>
            <li>
              <Strong>Save Split PDF (iPhone):</Strong> saves a PDF of your active split into On My iPhone →
              IronBuddy.
            </li>
            <li>
              <Strong>Export a copy / Share:</Strong> in the full version, the system share sheet for a JSON copy of your data; you choose where it goes. A PDF of your active split can be saved or shared in any version.
            </li>
            <li>
              <Strong>Share images:</Strong> in the full version, an image of a workout, a record or a chart, made on your device. You choose to share it through the system share sheet or save it: to Pictures/IronBuddy on Android, or, with Save to Photos on iPhone, to your Photos library (the App can only add to Photos; it never reads your photos).
            </li>
            <li>
              <Strong>Import / restore:</Strong> in the full version, you may choose a backup file to load into the App.
              The App keeps one copy of your data from just before an import inside the App so you
              can undo it.
            </li>
          </BulletList>
          <p>
            Exports, sharing, and imports are started by you. Once a file is saved or shared, the
            destination (Downloads folder, email, Drive, messaging apps, etc.) is outside
            IronBuddy’s control and subject to that destination’s policies. Uninstalling the App
            does not automatically delete files already saved in Downloads (Android) or in a folder you chose
            such as iCloud Drive (iPhone), or a backup stored in your Google account or iCloud.
          </p>
          <p>The backup file (Download → IronBuddy on Android, Files → IronBuddy on iPhone) and export of your data are available in the full version. During the free trial, your data is protected only by Android’s own backup or, on iPhone, by iCloud Backup, if you turn it on.</p>
        </ContentSection>

        <ContentSection id="transmission" title="8. Data handling and transmission">
          <p>
            IronBuddy does not transmit workout logs, body measurements, exercise history, notes, or
            other fitness information to IronBuddy-operated servers. All such information remains on
            your device unless you explicitly export, share, or back up your data using Android’s or Apple’s backup services or another destination you choose.
          </p>
        </ContentSection>

        <ContentSection id="permissions" title="9. Permissions">
          <p>The App may request or declare permissions such as:</p>
          <BulletList>
            <li>
              <Strong>Internet / network:</Strong> used by the Android WebView/OS networking stack
              (for example, if you open external links such as open-source credits). The App does
              not use this to upload your workout, body, or personal data.
            </li>
            <li>
              <Strong>Google Play Billing:</Strong> lets the App ask Google Play about, and
              complete, the one-time in-app purchase.
            </li>
            <li>
              <Strong>Storage / media access (as required by Android version):</Strong> to save the
              automatic backup file and exports in Downloads, and to read files you choose to
              import. If you choose a folder with Android’s folder picker, the App can access only
              that folder.
            </li>
            <li>
              <Strong>Android Auto Backup:</Strong> No additional permission is requested from the
              user for Android’s Auto Backup feature. When enabled in device settings, the feature
              is provided by the Android operating system.
            </li>
          </BulletList>
          <p>
            Exact permission labels shown by Android may vary by OS version. Unused sensitive
            permissions are not requested for core logging features.
          </p>
          <p>
            <Strong>On iPhone</Strong>, the App requests no special permissions. It can reach files only
            through the system pickers you use (to import a backup, or to choose a folder for the backup
            file), and in-app purchases go through Apple’s StoreKit. If you tap Save to Photos on a share
            image, iOS asks once for permission to add pictures to your Photos; the App can only add, and
            never reads your photos. It does not access your contacts, location, microphone, or camera.
          </p>
          <p>
            The iPhone App makes no network requests of its own; only Apple’s StoreKit talks to the App
            Store, for the purchase and the free-trial item. The links you can open from the App (the
            open-source credits, this privacy policy, and the App’s Write a Review page on the App Store)
            open outside the App, in your browser or the App Store.
          </p>
        </ContentSection>

        <ContentSection id="deleting-data" title="10. How you can delete data">
          <BulletList>
            <li>
              <Strong>In-app:</Strong> Settings → Reset All Data clears App data stored by IronBuddy
              on the device and returns you to setup.
            </li>
            <li>
              <Strong>Uninstall:</Strong> uninstalling removes the App’s private storage.
            </li>
            <li>
              <Strong>Backup files:</Strong> the automatic backup file, any JSON or PDF files you
              saved under Downloads, and images saved under Pictures (or shared elsewhere) are not removed by uninstalling or by
              Reset All Data; delete them manually if you no longer want those copies.
            </li>
            <li>
              <Strong>Google backup:</Strong> a backup stored in your Google account can be deleted
              in your phone’s settings (Google → Backup) or from your Google account.
            </li>
            <li>
              <Strong>iPhone:</Strong> deleting the App removes its data and its On My iPhone → IronBuddy
              folder. A backup file in a folder you chose (such as iCloud Drive) stays until you delete it
              in the Files app. An iCloud Backup can be managed in Settings → your name → iCloud → Manage
              Account Storage → Backups. Images saved to Photos stay there until you delete them.
            </li>
          </BulletList>
          <p>
            Because we do not host your workout data on IronBuddy servers, there is no separate
            cloud account deletion request for training logs. For privacy questions, email{" "}
            <TextLink href={`mailto:${email}`}>{email}</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="health-notice" title="11. Health and fitness notice">
          <p>
            IronBuddy is a fitness logging and planning tool. It is <Strong>not a medical device</Strong>{" "}
            and does not diagnose, treat, cure, or prevent any medical condition. Progress charts
            and estimated strength figures are informational calculations based on data you enter,
            not clinical advice. Consult a qualified healthcare professional for medical advice.
          </p>
        </ContentSection>

        <ContentSection id="children" title="12. Children">
          <p>
            The App is not directed at children under 13. Do not use IronBuddy if you are under the
            age required in your country to consent to use of local apps of this type.
          </p>
        </ContentSection>

        <ContentSection id="third-party" title="13. Third-party services">
          <p>
            If you open external links from the App (for example open-source credits), share files
            through other apps, make a purchase through Google Play or the App Store, or use Android’s backup or iCloud, those
            services are governed by their own terms and privacy policies. IronBuddy does not
            control them.
          </p>
          <p>
            <Strong>Bundled data and libraries:</Strong> the exercise names, instructions, demonstration
            images and muscles come from free-exercise-db (public domain), and the body drawing from
            react-native-body-highlighter (MIT license). They are built into the App together with the
            open-source libraries it uses, so they work offline and nothing is downloaded from them or
            sent to them. The full list is in the App under Settings → About → Credits &amp; Licenses.
          </p>
          <p>
            <Strong>Website analytics:</Strong> this website, workout.ironbuddy.fit, uses GoatCounter to count
            page views and referrers (the site a visitor came from, including a source tag in the
            link, such as utm_source). GoatCounter does not use cookies or store anything in your
            browser, and does not store IP addresses. It records the page, the referrer, and general
            details such as browser, operating system, screen width and country. This applies to the
            website only: the App contains no analytics. See{" "}
            <TextLink href="https://www.goatcounter.com/help/privacy">GoatCounter&apos;s privacy policy</TextLink>.
          </p>
        </ContentSection>

        <ContentSection id="changes" title="14. Changes to this policy">
          <p>
            We may update this Privacy Policy when the App or our practices change. The “Last
            updated” date at the top of this page will be revised accordingly. Any updates will be
            published on this page.
          </p>
        </ContentSection>

        <ContentSection id="contact" title="15. Contact">
          <p>
            Privacy questions or requests: <TextLink href={`mailto:${email}`}>{email}</TextLink>
          </p>
        </ContentSection>
      </PageBody>
    </main>
  );
}
