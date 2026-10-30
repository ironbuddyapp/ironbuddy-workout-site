import Link from "next/link";
import { Icon } from "@/components/icons";
import type { FeatureIcon } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FeatureCard({
  title,
  description,
  icon,
  href,
  featured = false,
}: {
  title: string;
  description: string;
  icon: FeatureIcon;
  /** The feature's own page; the whole card is the link. */
  href?: string;
  /** A core feature: larger, with its description always shown. The others are compact. */
  featured?: boolean;
}) {
  const body = featured ? (
    <div className="flex items-start gap-3 sm:block">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition duration-300 group-hover:bg-primary group-hover:text-background sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-white sm:mt-5 sm:text-xl">{title}</h3>
        <p className="mt-1 text-xs leading-snug text-muted sm:mt-2 sm:text-sm sm:leading-relaxed">{description}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary transition duration-300 group-hover:bg-primary group-hover:text-background sm:h-9 sm:w-9 sm:rounded-xl">
        <Icon name={icon} className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold leading-tight tracking-tight text-white sm:text-base">{title}</h3>
        <p className="mt-0.5 hidden text-xs leading-snug text-muted sm:block sm:text-sm">{description}</p>
      </div>
    </div>
  );
  const className = cn(
    "group block h-full border transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_60px_-32px_rgba(183,255,42,0.35)]",
    featured
      ? "rounded-2xl border-primary/20 bg-surface p-3.5 sm:rounded-3xl sm:p-6 lg:p-7"
      : "rounded-xl border-white/8 bg-surface p-2.5 sm:rounded-2xl sm:p-4",
  );
  if (href) {
    return (
      <article className="h-full">
        <Link href={href} className={className} aria-label={`${title}: read more`}>
          {body}
        </Link>
      </article>
    );
  }
  return <article className={className}>{body}</article>;
}
