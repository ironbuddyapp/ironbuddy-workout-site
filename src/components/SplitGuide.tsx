import { NumberedList, Strong, TextLink } from "@/components/content";
import { trialDetails } from "@/lib/content";
import { pages } from "@/lib/pages";

export type SplitDay = {
  day: string;
  focus: string;
  /** Exercises as the preset lists them, e.g. "Leg Press 3×10–12". */
  exercises: string[];
};

/** The days of a split with what each one trains and the exercises the IronBuddy preset uses. */
export function SplitDayTable({ days, caption }: { days: SplitDay[]; caption: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <th scope="col" className="px-3 py-3 sm:px-5">
              Day
            </th>
            <th scope="col" className="px-3 py-3 sm:px-5">
              Exercises (sets × reps)
            </th>
          </tr>
        </thead>
        <tbody>
          {days.map((row, index) => (
            <tr key={row.day} className={index !== days.length - 1 ? "border-b border-white/8" : undefined}>
              <th scope="row" className="min-w-[7.5rem] px-3 py-3 align-top sm:px-5">
                <span className="block font-medium text-white">{row.day}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">{row.focus}</span>
              </th>
              <td className="px-3 py-3 align-top leading-relaxed sm:px-5">{row.exercises.join(" · ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type WeekLayout = { name: string; week: string; fits: string };

/** Ways to lay the split over a calendar week. */
export function WeekLayouts({ layouts }: { layouts: WeekLayout[] }) {
  return (
    <ul className="space-y-3">
      {layouts.map((layout) => (
        <li key={layout.name} className="rounded-2xl border border-white/8 bg-surface p-5">
          <h3 className="text-base font-semibold tracking-tight text-white">{layout.name}</h3>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-semibold text-primary">Week: </span>
            {layout.week}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed">
            <span className="font-semibold text-white">Suits: </span>
            {layout.fits}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** The steps to run a preset split in IronBuddy; the same on every split guide. */
export function RunInIronBuddy({ preset, note }: { preset: string; note?: React.ReactNode }) {
  return (
    <>
      <p>
        IronBuddy includes <Strong>{preset}</Strong> as one of its ten preset splits, with the
        exercises above, a rep range and a rest time on every exercise. {note}
      </p>
      <NumberedList>
        <li>
          Open <Strong>Splits</Strong>, filter the presets if you like, and open {preset}.
        </li>
        <li>
          Tap <Strong>Set active</Strong>. Home shows this week&apos;s days with their status, and
          Edit Week puts each day on the weekday you train.
        </li>
        <li>
          Swap any exercise for one your gym has. The first time you edit a preset, IronBuddy saves
          your version under My splits and leaves the preset as it was.
        </li>
        <li>
          Open each day from Home, enter reps and weight (and any drop sets or supersets), then tap{" "}
          <Strong>Log workout</Strong>. The summary compares every exercise with last time.
        </li>
        <li>
          Check <Strong>Progress</Strong> for best weight, estimated 1RM and volume per exercise, and{" "}
          <Strong>Muscle Balance</Strong> on Home for your weekly sets per muscle group.
        </li>
      </NumberedList>
      <p>
        {trialDetails.includes} {trialDetails.unlocks} See{" "}
        <TextLink href={pages.trainingSplits.path}>training splits in IronBuddy</TextLink> for
        screenshots of the presets, filters and week editor.
      </p>
    </>
  );
}
