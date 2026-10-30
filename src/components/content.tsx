import Link from "next/link";
import { Children, isValidElement } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { trialDetails } from "@/lib/content";

const linkClass =
  "rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

/** Internal links use next/link; http(s) and mailto links open normally (http in a new tab). */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={cn(linkClass, className)}>
        {children}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkClass, className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(linkClass, className)}>
      {children}
    </Link>
  );
}

/** The ContentSection children of a page body, in order, for the "On this page" list. */
function sectionLinks(children: React.ReactNode) {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement(child) || child.type !== ContentSection) return [];
    const { id, title } = child.props as { id: string; title: string };
    return [{ id, title }];
  });
}

/** Links to the sections of a long page. Put on a page with PageBody's `toc` prop. */
function OnThisPage({ items }: { items: Array<{ id: string; title: string }> }) {
  return (
    <nav aria-labelledby="on-this-page" className="rounded-2xl border border-white/8 bg-surface p-5 sm:p-6">
      <p id="on-this-page" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        On this page
      </p>
      <ol className="mt-3 grid list-decimal gap-x-8 pl-5 text-[15px] marker:font-semibold marker:text-primary sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="py-0.5">
            <a
              href={`#${item.id}`}
              className="inline-block rounded-sm py-1 text-white/85 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Reading-width column used by every content page below the hero. `toc` adds an "On this page" list of the
 * page's ContentSections (right after a leading Callout such as Key takeaways); use it on long pages.
 */
export function PageBody({ children, toc = false }: { children: React.ReactNode; toc?: boolean }) {
  const nodes = Children.toArray(children);
  const links = toc ? sectionLinks(children) : [];
  const first = nodes[0];
  const leading = links.length >= 4 && isValidElement(first) && first.type !== ContentSection ? 1 : 0;
  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-12 pb-20 sm:space-y-14 sm:pb-24">
        {nodes.slice(0, leading)}
        {links.length >= 4 ? <OnThisPage items={links} /> : null}
        {nodes.slice(leading)}
      </div>
    </Container>
  );
}

export function ContentSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24", className)}>
      <h2
        id={headingId}
        className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}

/** What the free trial and the full version include, one fact per line (the same text as the FAQ and llms.txt). */
export function TrialNote({ children }: { children?: React.ReactNode }) {
  const facts = [trialDetails.includes, ...trialDetails.unlocks.split(/(?<=\.) /)];
  return (
    <div className="rounded-2xl border border-white/8 bg-surface p-5">
      <p className="text-sm font-semibold text-white">Free trial and full version</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary/70">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      {children ? <p className="mt-3 text-sm">{children}</p> : null}
    </div>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-2 text-lg font-semibold tracking-tight text-white">{children}</h3>;
}

export function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-primary/70">{children}</ul>;
}

export function NumberedList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-white">
      {children}
    </code>
  );
}

/** Short, self-contained answer placed near the top of a page so it can be quoted on its own. */
export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{title}</p>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-white/85 sm:text-base">
        {children}
      </div>
    </div>
  );
}
