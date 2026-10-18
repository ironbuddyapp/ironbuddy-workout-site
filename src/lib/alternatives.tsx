import { BulletList, Strong, TextLink } from "@/components/content";
import type { Faq } from "@/lib/content";
import { trialDetails } from "@/lib/content";
import type { PageDef } from "@/lib/pages";
import { pages } from "@/lib/pages";

/**
 * Content for the per-app alternative pages (/alternatives/strong/ and so on).
 *
 * The rule from the hub page applies here too: every statement is about IronBuddy and comes from the app
 * (1.0.13) or the privacy policy. Nothing is said about the named app's price, features or policies, which
 * change often. The name only tells the reader what the page is for.
 *
 * Each page covers a different part of IronBuddy (strength tracking, planning, backups, the exercise library,
 * set-by-set logging, body tracking) with its own how-to section, so the pages are not copies of each other. Keep it that way: shared text
 * belongs on the hub page, linked from here.
 */
export type Alternative = {
  /** The other app's name as its owner writes it. */
  name: string;
  page: PageDef;
  heading: string;
  lead: string;
  /** The part of IronBuddy this page covers in depth. */
  focus: { id: string; title: string; body: React.ReactNode };
  /** Practical advice on the same topic, useful whichever app the reader uses. */
  howTo: { id: string; title: string; body: React.ReactNode };
  /** Steps for moving over, specific to this page's topic. */
  switching: string[];
  /** Second half of the import answer: how to start over, for this page's topic. */
  freshStart: string;
  /** Extra question for this page. Affiliation and import questions are added for every page. */
  faq: Faq;
};

/** The questions every alternative page answers, worded for the app it is about. Ids stay unique per page. */
export function alternativeFaqs(alt: Alternative): Faq[] {
  return [
    {
      id: "affiliation",
      question: `Is IronBuddy affiliated with ${alt.name}?`,
      answer: `No. ${alt.name} is a trademark of its owner, and IronBuddy has no affiliation with it. The name is used here only to describe what people search for.`,
    },
    {
      id: "import",
      question: `Can I import my ${alt.name} workout history into IronBuddy?`,
      answer: `No. IronBuddy restores only its own backup files, so history from other apps cannot be imported. ${alt.freshStart}`,
    },
    alt.faq,
  ];
}

export const alternatives = {
  strong: {
    name: "Strong",
    page: pages.strongAlternative,
    heading: "Looking for a Strong alternative? Track your strength offline with IronBuddy",
    lead: "If the numbers you care about are your 1RM (one-rep max), calculated with the Epley formula, your training volume and your personal records, IronBuddy charts all three on your Android phone, with no connection, no account, no ads and no subscription.",
    focus: {
      id: "tracking-strength",
      title: "How IronBuddy tracks your strength",
      body: (
        <>
          <p>
            Every set you log, with its weight and reps, feeds the Progress tab. It has three views:
            Workouts, Exercises and Body.
          </p>
          <BulletList>
            <li>
              <Strong>1RM:</Strong> Progress, then Exercises, charts the 1RM for each
              exercise. IronBuddy uses the Epley formula, weight × (1 + reps ÷ 30), on
              the best completed set of each workout, and counts sets of more than 12 reps as 12.
            </li>
            <li>
              <Strong>Training volume:</Strong> Progress, then Workouts, shows total and average
              workout volume, and Exercises charts any single exercise.
            </li>
            <li>
              <Strong>Personal records:</Strong> when you save a workout with a heavier weight than
              you have logged before for an exercise, IronBuddy marks it as a PR.
            </li>
            <li>
              <Strong>Last time, at a glance:</Strong> open any exercise to see the date and sets of
              your last session, that session&apos;s best 1RM, and its records, including your best estimated 1RM.
            </li>
          </BulletList>
          <p>Choose a range from one week to all time.</p>
        </>
      ),
    },
    howTo: {
      id: "reading-charts",
      title: "Reading your strength charts",
      body: (
        <>
          <BulletList>
            <li>
              <Strong>Compare an exercise with itself.</Strong> A bench press estimate says nothing
              about your squat. Look at one lift across several weeks.
            </li>
            <li>
              <Strong>Treat the estimate as a trend line.</Strong> A single workout can be high or
              low. What matters is whether the line rises over a month or two.
            </li>
            <li>
              <Strong>Expect dips after light weeks.</Strong> A deload or a week of higher reps can
              lower the estimate without any loss of strength.
            </li>
            <li>
              <Strong>Reps count too.</Strong> The PR marker is about weight, so more reps at the same
              weight shows up in your 1RM and volume instead.
            </li>
          </BulletList>
          <p>
            For a simple way to turn these numbers into next week&apos;s targets, read{" "}
            <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>.
          </p>
        </>
      ),
    },
    switching: [
      "Export your Strong history first if the app offers an export, and keep the file as an archive.",
      "Write down your current working weight and reps for each main lift. These are your starting numbers.",
      "Install IronBuddy, start the free trial, and pick the split closest to the one you run now.",
      "Log your first week as normal. Your 1RM and volume charts start from these sessions.",
    ],
    freshStart:
      "Start a fresh log with your current working weights for the main lifts, and your strength charts fill in within a few weeks.",
    faq: {
      id: "personal-records",
      question: "Does IronBuddy show personal records?",
      answer:
        "Yes. When you save a workout with a heavier weight than you have logged before for an exercise, IronBuddy marks it as a personal record. Opening an exercise also shows its records, including your best estimated 1RM.",
    },
  },
  hevy: {
    name: "Hevy",
    page: pages.hevyAlternative,
    heading: "Looking for a Hevy alternative? Plan your training week offline with IronBuddy",
    lead: "IronBuddy is built around training splits. Pick one of 10 built-in splits or shape your own, and your whole week appears on the home screen of your Android phone, ready to log offline, with no account, no ads and no subscription.",
    focus: {
      id: "planning",
      title: "How IronBuddy plans your week",
      body: (
        <>
          <p>
            A split is your weekly plan: which exercises you do on which day. Use Set active to
            choose the split you are running. The home screen then shows this week&apos;s training days
            and whether each one is done in full, in part, or missed, with a week and a month view.
          </p>
          <p>
            Edit any day&apos;s exercises. The first time you edit a built-in split, IronBuddy saves
            your version as your own copy. When you change a workout, the “Also update my plan” switch
            decides whether the change applies to that date only or to the same day in later weeks.
            You can also export your active split as a PDF.
          </p>
        </>
      ),
    },
    howTo: {
      id: "choosing-a-split",
      title: "Choosing a split for the days you can train",
      body: (
        <>
          <p>
            The best split is one that fits the days you can actually get to the gym. IronBuddy&apos;s
            10 built-in splits, by training days per week:
          </p>
          <BulletList>
            <li>
              <Strong>2 days:</Strong> Push / Pull (2×)
            </li>
            <li>
              <Strong>3 days:</Strong> Full Body 3× or Push / Pull / Legs (3×)
            </li>
            <li>
              <Strong>4 days:</Strong> Upper / Lower, PHUL, or 5/3/1 (BBB)
            </li>
            <li>
              <Strong>5 days:</Strong> Bro Split (5×) or PHAT
            </li>
            <li>
              <Strong>6 days:</Strong> Push / Pull / Legs (6×) or Arnold Split (6×)
            </li>
          </BulletList>
          <p>
            If you are unsure, start with fewer days and add more once you are recovering well. The{" "}
            <TextLink href={pages.pushPullLegs.path}>Push Pull Legs guide</TextLink> walks through one
            popular layout in detail.
          </p>
        </>
      ),
    },
    switching: [
      "Export your Hevy history first if the app offers an export, and keep the file as an archive.",
      "List the routines you train now, day by day, with the exercises on each.",
      "In IronBuddy, open the built-in split closest to your routine and edit its days to match.",
      "Tap Set active. Your week appears on the home screen, ready to log.",
    ],
    freshStart:
      "Rebuild your routine as an IronBuddy split, then log from today; your weekly view and charts start from your first session.",
    faq: {
      id: "own-routine",
      question: "Can I follow my own routine in IronBuddy instead of a template?",
      answer:
        "Yes. You can edit any built-in split, and IronBuddy saves your version as your own copy. Building a split from scratch is part of the full app, which the one-time purchase unlocks.",
    },
  },
  fitnotes: {
    name: "FitNotes",
    page: pages.fitnotesAlternative,
    heading: "Looking for a FitNotes alternative? Keep an offline gym log with automatic backups",
    lead: "An offline gym log is only as safe as its backups. IronBuddy keeps your training data on your Android phone and saves an always-current backup file you can copy anywhere, with no account, no ads and no subscription.",
    focus: {
      id: "backups",
      title: "How IronBuddy keeps your log safe",
      body: (
        <>
          <p>
            Your workouts, splits, notes and body metrics are stored on your phone, not on an
            IronBuddy server. Because there is no cloud account, IronBuddy gives you several ways to
            keep a copy:
          </p>
          <BulletList>
            <li>
              <Strong>Automatic backup file:</Strong> In the full version, IronBuddy keeps one up-to-date file, named ironbuddy-backup.json, in your phone&apos;s Download → IronBuddy folder. You can turn it off in Settings.
            </li>
            <li>
              <Strong>Android backup:</Strong> when Google backup is turned on in your phone&apos;s
              settings, Android backs the app up to your Google account and restores it when you
              reinstall IronBuddy or move to a new phone.
            </li>
            <li>
              <Strong>Manual export:</Strong> in the full version, save or share a JSON copy of all your data whenever you like. A PDF of your active split is available in any version.
            </li>
            <li>
              <Strong>Restore with an undo:</Strong> in the full version, import a backup file from Settings. IronBuddy
              keeps a copy of your data from just before the import, so you can undo it.
            </li>
          </BulletList>
          <p>
            For exactly what is stored and where, see{" "}
            <TextLink href={pages.privacyFocused.path}>how IronBuddy handles your data</TextLink>.
          </p>
        </>
      ),
    },
    howTo: {
      id: "backup-routine",
      title: "A simple backup routine for any offline log",
      body: (
        <BulletList>
          <li>
            <Strong>Check once:</Strong> after your first workout, make sure the backup file exists
            where you expect it.
          </li>
          <li>
            <Strong>Copy it off the phone:</Strong> once a month, or after a big training block, copy
            the file to a computer or a cloud drive you trust. A backup on the same phone does not
            survive losing the phone.
          </li>
          <li>
            <Strong>Before a big change:</Strong> export a fresh copy before you reset your phone,
            switch phones, or reinstall the app.
          </li>
          <li>
            <Strong>Keep Google backup on:</Strong> if you are comfortable with Android backing up
            your apps, it is a second copy you do not have to think about.
          </li>
        </BulletList>
      ),
    },
    switching: [
      "Export your FitNotes history first if the app offers an export, and keep the file as an archive.",
      "Install IronBuddy and log your first workout.",
      "Open your phone's Download → IronBuddy folder and check that ironbuddy-backup.json is there.",
      "Every so often, copy that file to a computer or a cloud drive, so your log survives a lost phone.",
    ],
    freshStart:
      "Start a fresh log today, and check that IronBuddy's backup file appears after your first workout so the new log is protected from day one.",
    faq: {
      id: "new-phone",
      question: "How do I move IronBuddy to a new phone?",
      answer:
        "Copy your backup file (Download → IronBuddy → ironbuddy-backup.json) or an exported JSON file to the new phone. Install IronBuddy, then import the file from Settings. If Google backup is turned on, Android can also restore the app for you when you set up the new phone.",
    },
  },
  jefit: {
    name: "JEFIT",
    page: pages.jefitAlternative,
    heading: "Looking for a JEFIT alternative? Browse 800+ exercises offline with IronBuddy",
    lead: "IronBuddy's exercise library has more than 800 exercises, each with a demonstration, and you can search and filter it on your Android phone with no internet connection. There is no account, no ads and no subscription.",
    focus: {
      id: "library",
      title: "How IronBuddy's exercise library works",
      body: (
        <>
          <BulletList>
            <li>
              <Strong>800+ exercises:</Strong> search by name, then filter by muscle group (chest,
              back, traps, legs, shoulders and more) and by equipment (barbell, dumbbell, machine,
              bodyweight and more).
            </li>
            <li>
              <Strong>Demonstrations:</Strong> each exercise has a demonstration thumbnail, so you can
              check you have the right movement.
            </li>
            <li>
              <Strong>Your history per exercise:</Strong> open an exercise to see what you did last
              time, that session&apos;s best 1RM (one-rep max), calculated with the Epley formula, and its records, including your best estimated 1RM.
            </li>
            <li>
              <Strong>Works offline:</Strong> the library is stored on your phone, so searching and
              filtering need no connection.
            </li>
            <li>
              <Strong>Custom exercises:</Strong> the full app lets you add an exercise that is not in
              the library.
            </li>
          </BulletList>
          <p>
            {trialDetails.includes} {trialDetails.unlocks}
          </p>
        </>
      ),
    },
    howTo: {
      id: "finding-exercises",
      title: "Finding the right exercise quickly",
      body: (
        <BulletList>
          <li>
            <Strong>Filter before you search.</Strong> Pick the muscle group, then the equipment you
            have. The list gets short fast.
          </li>
          <li>
            <Strong>Match the variation, not just the name.</Strong> The same lift comes in barbell,
            dumbbell and machine versions, and the grip or angle can differ too. Choose the one you
            actually do.
          </li>
          <li>
            <Strong>Check the demonstration</Strong> when two names sound alike.
          </li>
          <li>
            <Strong>Stick with one name per lift.</Strong> Logging the same movement under two names
            splits its history, so its charts stop lining up.
          </li>
        </BulletList>
      ),
    },
    switching: [
      "Export your JEFIT history first if the app offers an export, and keep the file as an archive.",
      "List the exercises you train each week.",
      "Search for each one in IronBuddy's library, filter by equipment where names differ, and pick the closest variation.",
      "Add anything missing as a custom exercise once you have the full app.",
    ],
    freshStart:
      "Find your usual exercises in the library, then start a fresh log with your current working weights.",
    faq: {
      id: "missing-exercise",
      question: "Can I add an exercise that is not in IronBuddy's library?",
      answer:
        "Yes. The full app, unlocked by the one-time purchase, lets you create custom exercises and log them like any other. The library already covers more than 800 exercises across barbell, dumbbell, machine and bodyweight movements.",
    },
  },
  boostcamp: {
    name: "Boostcamp",
    page: pages.boostcampAlternative,
    heading: "Looking for a Boostcamp alternative? Log every set offline with IronBuddy",
    lead: "IronBuddy is built for logging at the gym: reps and weight for every set, set techniques like drop sets and supersets, and notes, on your Android phone with no connection, no account, no ads and no subscription.",
    focus: {
      id: "logging",
      title: "How IronBuddy logs your sets",
      body: (
        <>
          <p>
            Open a training day from the home screen with its Log button, or log a single exercise from
            its preview. Every set gets its own reps and weight.
          </p>
          <BulletList>
            <li>
              <Strong>Quick + and − buttons:</Strong> reps step by 1 and weight by 2.5 kg or 5 lb. On
              an empty field, + starts from the previous set&apos;s value. You can still type any number.
            </li>
            <li>
              <Strong>Sets control:</Strong> + copies your last set and − removes it, so adding a set
              takes one tap.
            </li>
            <li>
              <Strong>Set techniques:</Strong> add a drop set, rest-pause, myo-rep, cluster set,
              back-off set, mechanical drop, pyramid or superset to any set.
            </li>
            <li>
              <Strong>Notes:</Strong> add a note to any exercise, and a note for the whole day of up to
              500 characters.
            </li>
            <li>
              <Strong>Quick log:</Strong> log one exercise into your history without editing the whole
              day.
            </li>
            <li>
              <Strong>Any date:</Strong> log a workout for today or fill in a past date.
            </li>
          </BulletList>
        </>
      ),
    },
    howTo: {
      id: "logging-techniques",
      title: "Logging drop sets and supersets so they stay comparable",
      body: (
        <>
          <BulletList>
            <li>
              <Strong>Log the working set first.</Strong> Its weight and reps are the numbers to
              compare week to week. IronBuddy attaches a technique to the working set and uses the
              working set for your 1RM (one-rep max), calculated with the Epley formula, so the extra reps from a drop or rest-pause do not
              inflate it.
            </li>
            <li>
              <Strong>Use each technique the same way every time.</Strong> If a drop set means one
              strip of about 20%, keep it that way, so the sessions line up.
            </li>
            <li>
              <Strong>Supersets:</Strong> log each exercise&apos;s own sets, and add the Superset
              technique to a set to mark it as done back-to-back with the next exercise. Each exercise
              keeps its own history.
            </li>
            <li>
              <Strong>Write down what changed.</Strong> A new grip, a slower tempo or a sore joint
              explains a number that looks odd a month later.
            </li>
          </BulletList>
          <p>
            For what to record and why, read{" "}
            <TextLink href={pages.logWorkouts.path}>how to log your workouts</TextLink>.
          </p>
        </>
      ),
    },
    switching: [
      "Export your Boostcamp history first if the app offers an export, and keep the file as an archive.",
      "Write down the program you follow now: the days, the exercises, and the sets and reps for each.",
      "In IronBuddy, pick the built-in split closest to your program and edit its days to match.",
      "Log your first session set by set, adding drop sets or supersets where your program uses them.",
    ],
    freshStart:
      "Start a fresh log with your current working weights and log each set as you go; your history builds from the first session.",
    faq: {
      id: "set-techniques",
      question: "Can I log drop sets and supersets in IronBuddy?",
      answer:
        "Yes. You can add a drop set, rest-pause, myo-rep, cluster set, back-off set, mechanical drop, pyramid or superset to any set. IronBuddy keeps the working set's weight and reps as the numbers it uses for your 1RM.",
    },
  },
  caliber: {
    name: "Caliber",
    page: pages.caliberAlternative,
    heading: "Looking for a Caliber alternative? Track your lifts and body weight offline with IronBuddy",
    lead: "IronBuddy keeps your strength training and your body measurements in one place: log your lifts, add your body weight and body fat % whenever you like, and see both charted on your Android phone with no connection, no account, no ads and no subscription.",
    focus: {
      id: "body-tracking",
      title: "How IronBuddy tracks body weight and body fat",
      body: (
        <>
          <BulletList>
            <li>
              <Strong>Add an entry:</Strong> in Settings, open Body Tracking and enter your weight,
              your body fat %, or both. Entries are optional, so you only track what is useful to you.
            </li>
            <li>
              <Strong>See the trend:</Strong> Progress, then Body, charts body weight and body fat %
              over time, from one week to all time.
            </li>
            <li>
              <Strong>Long histories stay readable:</Strong> once you have a lot of entries, the charts
              group them into weekly or monthly averages, so day-to-day swings do not hide the trend.
            </li>
            <li>
              <Strong>Next to your lifts:</Strong> the Exercises and Workouts views on the same Progress
              tab show your 1RM (one-rep max), calculated with the Epley formula, and training volume, so you can read body changes against
              strength.
            </li>
            <li>
              <Strong>Kilograms or pounds:</Strong> choose your unit in the app.
            </li>
          </BulletList>
        </>
      ),
    },
    howTo: {
      id: "weigh-ins",
      title: "Getting a body weight trend you can trust",
      body: (
        <>
          <BulletList>
            <li>
              <Strong>Weigh in the same way each time:</Strong> for example in the morning, before
              eating, on the same scale.
            </li>
            <li>
              <Strong>Expect daily swings:</Strong> water, food and salt can move the scale by a
              kilogram or more from one day to the next.
            </li>
            <li>
              <Strong>Compare weeks, not days:</Strong> a weekly average says far more than a single
              reading.
            </li>
            <li>
              <Strong>Keep body fat estimates consistent:</Strong> use the same method and conditions
              each time. The trend matters more than the exact number.
            </li>
            <li>
              <Strong>Read weight and strength together:</Strong> the same change on the scale means
              something different when your 1RM is rising than when it is falling.
            </li>
          </BulletList>
          <p>
            For turning strength numbers into next week&apos;s targets, read{" "}
            <TextLink href={pages.progressiveOverload.path}>how to track progressive overload</TextLink>.
          </p>
        </>
      ),
    },
    switching: [
      "Export your Caliber history first if the app offers an export, and keep the file as an archive.",
      "Note your current body weight and, if you track it, your body fat %.",
      "Install IronBuddy and add them in Settings, under Body Tracking, so your body chart starts today.",
      "Log your usual workouts; the Body, Exercises and Workouts views fill in as you go.",
    ],
    freshStart:
      "Add today's body weight in Settings, under Body Tracking, and start logging your workouts; both charts start from day one.",
    faq: {
      id: "body-fat",
      question: "Does IronBuddy calculate my body fat percentage?",
      answer:
        "No. You enter your body fat % yourself, from whichever method you use, and IronBuddy charts it over time alongside your body weight. It tracks what you enter; it does not estimate body fat.",
    },
  },
} as const satisfies Record<string, Alternative>;

export type AlternativeKey = keyof typeof alternatives;
