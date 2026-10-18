import { cn } from "@/lib/cn";

/**
 * A plain table of facts that scrolls sideways inside its own box on narrow screens, so the page itself never
 * scrolls sideways. The first column is the row header and stays in view while the rest scrolls.
 */
export function FactsTable({
  caption,
  columns,
  rows,
  className,
}: {
  caption: string;
  columns: string[];
  rows: Array<{ id: string; highlight?: boolean; cells: React.ReactNode[] }>;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-3xl border border-white/8 bg-surface", className)}>
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/8 bg-white/[0.02] text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn("px-4 py-3 align-bottom sm:px-5", index === 0 && "sticky left-0 bg-surface")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={cn(rowIndex !== rows.length - 1 && "border-b border-white/8", row.highlight && "bg-primary/[0.05]")}
            >
              {row.cells.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={index}
                    scope="row"
                    className={cn(
                      "sticky left-0 px-4 py-3.5 align-top text-sm font-semibold text-white sm:px-5",
                      row.highlight ? "bg-[#101d12]" : "bg-surface",
                    )}
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="px-4 py-3.5 align-top text-sm leading-relaxed text-muted sm:px-5">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
