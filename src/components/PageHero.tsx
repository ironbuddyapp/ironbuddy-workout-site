import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { Crumb } from "@/lib/structured-data";

export function PageHero({
  trail,
  eyebrow,
  title,
  lead,
  updated,
  wide = false,
  children,
}: {
  trail: Crumb[];
  eyebrow: string;
  title: string;
  /** The answer-first paragraph: a plain statement of what the page covers that can be quoted on its own. */
  lead: React.ReactNode;
  /** ISO date shown as "Last updated". */
  updated?: string;
  /** Align with a wider content column (used by the features page's two-column blocks). */
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <Container className="relative pb-10 pt-4 sm:pb-14 sm:pt-8">
        <div className={cn("mx-auto", wide ? "max-w-5xl" : "max-w-3xl")}>
          <Breadcrumbs trail={trail} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:mt-8">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            {lead}
          </p>
          {updated ? (
            <p className="mt-5 text-xs text-muted">
              Last updated <time dateTime={updated}>{formatDate(updated)}</time>
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
