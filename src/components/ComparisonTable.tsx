import { Icon } from "@/components/icons";
import { comparisonRows } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/8 bg-surface">
      <table className="w-full border-collapse">
        <caption className="sr-only">
          IronBuddy compared with how many other fitness apps work on offline use, accounts,
          subscriptions, ads, and where your data lives
        </caption>
        <thead>
          <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <th scope="col" className="px-3 py-3 text-left sm:px-8 sm:py-4">
              <span className="sr-only sm:not-sr-only">Feature</span>
            </th>
            <th scope="col" className="px-3 py-3 text-center text-primary sm:px-8 sm:py-4">
              IronBuddy
            </th>
            <th scope="col" className="px-3 py-3 text-center sm:px-8 sm:py-4">
              <span className="sm:hidden">Other apps</span>
              <span className="hidden sm:inline">Many other apps</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, index) => (
            <tr
              key={row.feature}
              className={cn(index !== comparisonRows.length - 1 && "border-b border-white/8")}
            >
              <th
                scope="row"
                className="px-3 py-2.5 text-left text-sm font-medium text-white sm:px-8 sm:py-4 sm:text-base"
              >
                {row.feature}
              </th>
              <td className="px-2 py-2.5 sm:px-8 sm:py-4">
                <span className="mx-auto flex items-center justify-center gap-1.5 text-xs font-medium text-white sm:gap-2 sm:text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary sm:h-6 sm:w-6">
                    <Icon name="check" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </span>
                  {row.ironbuddy}
                </span>
              </td>
              <td className="px-2 py-2.5 text-center text-xs text-muted sm:px-8 sm:py-4 sm:text-sm">
                {row.others}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
