import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { BulletList, Strong, TextLink } from "@/components/content";
import { CtaBanner, HeroCta } from "@/components/CtaBanner";
import { FeatureBlock } from "@/components/FeatureBlock";
import { JsonLd } from "@/components/JsonLd";
import { KeyFacts } from "@/components/KeyFacts";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { VideoCard } from "@/components/VideoCard";
import { pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { pageGraph, trail } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(pages.features);

export default function FeaturesPage() {
  const crumbs = trail(pages.home, pages.features);

  return (
    <main id="main">
      <JsonLd data={pageGraph(pages.features, { trail: crumbs, about: "app", video: true })} />
      <PageHero
        wide
        trail={crumbs}
        eyebrow="Features"
        title="Gym log app features: log, splits, charts and a Home you arrange"
        updated={pages.features.modified}
        lead="IronBuddy is a gym log app built around what lifters actually do at the gym: log sets, follow a training split, and check whether the numbers are going up. It works offline, needs no account, and has no ads or subscription. Each feature below has its own page that goes deeper."
      >
        <HeroCta />
      </PageHero>

      <Container>
        <div className="mx-auto max-w-5xl space-y-16 pb-20 sm:space-y-24 sm:pb-24">
          <div className="max-w-3xl">
            <KeyFacts
              id="at-a-glance"
              title="IronBuddy at a glance"
              items={[
                { term: "Platform", detail: "Android, through Google Play. Not available on iPhone yet." },
                {
                  term: "Works offline",
                  detail: "Yes. Logging, workout history and the exercise library need no internet connection.",
                },
                { term: "Account", detail: "None. There is no sign-up or sign-in." },
                { term: "Ads", detail: "None." },
                {
                  term: "Pricing",
                  detail: `Free to download with a ${siteConfig.freeTrialDays}-day free trial of the whole workout tracker: logging, every split and exercise, progress charts and body metrics. The full version adds export and import, a local copy of your data, share cards, a customizable Home (arrange and resize your cards) and accent colors. After the trial, a one-time in-app purchase keeps everything unlocked and is required to keep logging and editing. No subscription.`,
                },
                {
                  term: "Your data",
                  detail: "Stored on your device and not sent to IronBuddy servers.",
                },
                { term: "Units", detail: "Kilograms or pounds." },
              ]}
            />
          </div>

          <section id="video" aria-labelledby="video-heading" className="max-w-3xl">
            <h2 id="video-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
              See it in two minutes
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
              The Play Store tour: your week, logging a workout, progress, splits and customising your
              dashboard, with no voice-over.
            </p>
            <VideoCard className="mt-5" />
          </section>

          <FeatureBlock
            id="workout-logging"
            title="Workout logging: sets, reps, weight, techniques and notes"
            shot="logging"
            more={{ href: pages.setTechniques.path, label: "Logging and set techniques in detail" }}
          >
            <p>
              Record each exercise as sets, reps and weight, for today or a past date, and add
              exercises on the fly. Drag exercises into the order you train them, write a note on an
              exercise or on the whole day, and log the techniques you actually use: drop sets,
              supersets, rest-pause, pyramid, back-off sets, myo-reps, cluster sets and mechanical
              drops, each with its own reps and weight.
            </p>
            <p>
              Exercises without reps or weight are skipped, so an unfinished row does not clutter
              your history. The &ldquo;Also update my plan&rdquo; switch decides whether a change
              applies to that date only or to the same day in later weeks. New to logging? Read{" "}
              <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>.
            </p>
          </FeatureBlock>

          <FeatureBlock id="weekly-view" title="Home: today, your week and your widgets" shot="dashboard" flip>
            <p>
              Home opens on today: the workout planned for today, its exercises and what you lifted
              last time, with one <Strong>Log</Strong> button. Under it, your week: each day&apos;s
              circle shows whether it is logged, partly logged, missed, today or a rest day, and the
              progress at the top right counts every workout you log, planned or not.
            </p>
            <p>
              Missed a day? &ldquo;Missed Push on Mon · Move to Sat&rdquo; moves that workout to the
              next free day in one tap. Switch between a week and a month view, or tap the date to
              jump to any week.
            </p>
            <p>
              Below it, swipe between three pages of widgets that fit the screen without scrolling: the
              muscles you worked this week on a body map, your last workout, an exercise chart,
              personal records, workout counts, body weight, Muscle Balance and volume per muscle.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="customizable-home"
            title="A customizable Home: your calendar look and your widgets"
            shot="customise"
            more={{ href: pages.customizableHome.path, label: "How the customizable Home works" }}
          >
            <p>
              Pick how the calendar looks: five day styles (Ring, Boxes, Track, Effort or Agenda),
              five ways to show your progress, and the greeting above it. In the full version,
              arrange the widgets too: tap the dashboard button, or hold a widget, then drag it, even to another
              page; tap or drag its corner handle to make it small, wide, tall or large; remove the
              widgets you don&apos;t need and add others, such as a chart for every exercise you care
              about. Reset puts the default widgets back.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="muscle-balance"
            title="Muscle Balance and muscles worked"
            shot="balance"
            flip
            more={{ href: pages.muscleBalance.path, label: "Muscle Balance in detail" }}
          >
            <p>
              Muscle Balance counts your working sets this week for six body areas (chest, shoulders,
              arms, core, legs and back) against last week, and names the areas you have not trained
              yet. Each set counts once, for the main muscle of the exercise.
            </p>
            <p>
              Muscles worked lights up every muscle you trained this week on a front and back body
              map, glutes included after squats and deadlifts. Open any exercise to see its target
              muscles, primary solid and secondary faded.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="training-splits"
            title="Training splits and workout planning"
            shot="splits"
            more={{ href: pages.trainingSplits.path, label: "All ten presets and how splits work" }}
          >
            <p>
              Start from a preset or build your own. IronBuddy includes ten: Full Body 3×, Upper /
              Lower, Push / Pull / Legs (3× and 6×), Push / Pull (2×), Bro Split, Arnold Split, PHUL,
              PHAT and 5/3/1 (BBB), each with rep ranges and rest times on every exercise. Filter them
              by days a week, style and level, make one active, edit any day, and export your active
              split as a PDF.
            </p>
            <p>
              Every preset has a guide: <TextLink href={pages.fullBody.path}>Full Body</TextLink>,{" "}
              <TextLink href={pages.upperLower.path}>Upper Lower</TextLink>,{" "}
              <TextLink href={pages.pushPullLegs.path}>Push Pull Legs</TextLink>,{" "}
              <TextLink href={pages.phul.path}>PHUL</TextLink>, <TextLink href={pages.phat.path}>PHAT</TextLink>,{" "}
              <TextLink href={pages.broSplit.path}>bro split</TextLink>,{" "}
              <TextLink href={pages.arnoldSplit.path}>Arnold split</TextLink> and{" "}
              <TextLink href={pages.fiveThreeOne.path}>5/3/1 Boring But Big</TextLink>.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="progress-tracking"
            title="Progress charts: best weight, 1RM, volume, reps"
            shot="progress"
            flip
            more={{ href: pages.progressCharts.path, label: "Every chart, explained" }}
          >
            <p>
              The Progress tab has three views. Workouts charts your total training volume and the
              average per workout. Exercises charts one lift at a time: best weight, estimated 1RM
              (Epley formula on the best set of each workout), weight against reps, volume or reps.
              Body charts your weight and body fat.
            </p>
            <p>
              Every chart shows its headline number and how it changed, ranges from one week to all
              time, and a full-screen view. These are the numbers lifters use to check progressive
              overload; for a simple method, read{" "}
              <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="workout-summary"
            title="Workout summary and personal records"
            shot="summary"
            more={{ href: pages.workoutSummary.path, label: "The workout summary in detail" }}
          >
            <p>
              Open a workout in History to see each exercise against last time (+2.5 kg, +2 reps,
              same as last time, or first time), a marker on the set that earned a new record, the
              muscles you worked and the sets per muscle. Every exercise keeps its records: heaviest
              weight, most reps, best session volume and best estimated 1RM, with dates, and the app
              tells you when you save a new one.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="share-cards"
            title="Share cards: workouts, PRs and charts as images (full version)"
            shot="share"
            flip
            more={{ href: pages.shareCards.path, label: "How share cards work" }}
          >
            <p>
              Turn a workout, a personal record or a progress chart into an image in your accent
              colour and share it with Android&apos;s share sheet, or save it to your phone. The image
              is made on your phone; nothing is uploaded.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="body-metrics"
            title="Body metrics: weight and body fat percentage"
            shot="metrics"
            more={{ href: `${pages.progressCharts.path}#body`, label: "Body weight and body fat charts" }}
          >
            <p>
              Log body weight and body fat percentage whenever you want to, in Settings under Body
              Tracking, and see each as a chart over the same time ranges as your training. Body
              metrics are optional, so you only track what is useful to you.
            </p>
          </FeatureBlock>

          <FeatureBlock
            id="exercise-library"
            title="Exercise library with demonstrations, filters and your records"
            shot="library"
            flip
            more={{ href: pages.exerciseLibrary.path, label: "The exercise library in detail" }}
          >
            <p>
              Search more than 800 exercises, filter by muscle group and by equipment, sort A–Z or by
              the ones you did most recently, and see a demonstration for each one. Open any exercise
              to see your last workout, your records, the muscles it targets on a body map and written
              cues for good form. The library works offline, like the rest of the app.
            </p>
          </FeatureBlock>

          <FeatureBlock id="make-it-yours" title="Make it yours" shot="colors">
            <p>
              Light, dark or follow your phone&apos;s theme. In the full version, pick one of eight
              accent colours: it recolours buttons, charts, the body map, highlights and your share
              cards, in light and dark theme.
            </p>
            <p>Settings has a search box that finds any setting, such as &ldquo;theme&rdquo; or &ldquo;backup&rdquo;.</p>
          </FeatureBlock>

          <FeatureBlock
            id="your-data"
            title="Your data: offline, private, and portable"
            shot="data"
            flip
            more={{ href: pages.offline.path, label: "How offline tracking works" }}
          >
            <BulletList>
              <li>
                <Strong>Offline:</Strong> logging, history, and the exercise library work without a
                connection.
              </li>
              <li>
                <Strong>No account:</Strong> there is no sign-up or sign-in and no IronBuddy cloud.
              </li>
              <li>
                <Strong>Stored on your device:</Strong> workouts, splits, notes, body metrics, and
                settings live in the app&apos;s on-device storage. See{" "}
                <TextLink href={pages.privacyFocused.path}>what IronBuddy stores and where</TextLink>.
              </li>
              <li>
                <Strong>Backups you control:</Strong> in the full version, an automatic JSON backup file in your Downloads folder (you can turn it off in Settings), manual JSON export, and import with an undo copy kept from just before the import.
              </li>
              <li>
                <Strong>Reset All Data:</Strong> clears what IronBuddy stores on the device.
              </li>
            </BulletList>
          </FeatureBlock>

          <CtaBanner />

          <RelatedLinks
            items={[
              pages.whatsNew,
              pages.noSubscription,
              pages.privacyFocused,
              pages.progressiveOverload,
            ]}
          />
        </div>
      </Container>
    </main>
  );
}
