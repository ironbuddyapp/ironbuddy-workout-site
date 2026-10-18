import Link from "next/link";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

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

/** Reading-width column used by every content page below the hero. */
export function PageBody({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-12 pb-20 sm:space-y-14 sm:pb-24">{children}</div>
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
