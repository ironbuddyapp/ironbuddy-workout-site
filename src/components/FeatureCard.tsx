import Link from "next/link";
import { Icon } from "@/components/icons";
import type { FeatureIcon } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FeatureCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: FeatureIcon;
  /** The feature's own page; the whole card is the link. */
  href?: string;
}) {
  const body = (
    <>
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/12 text-primary transition duration-300 group-hover:bg-primary group-hover:text-background sm:h-11 sm:w-11 sm:rounded-2xl">
        <Icon name={icon} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <h3 className="mt-2 text-sm font-semibold tracking-tight text-white sm:mt-5 sm:text-lg">{title}</h3>
      <p className={cn("mt-1 line-clamp-3 text-xs leading-snug text-muted sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-relaxed")}>{description}</p>
    </>
  );
  const className =
    "group block rounded-2xl border border-white/8 bg-surface p-3 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_60px_-32px_rgba(183,255,42,0.35)] sm:rounded-3xl sm:p-6 lg:p-7";
  if (href) {
    return (
      <article>
        <Link href={href} className={className} aria-label={`${title}: read more`}>
          {body}
        </Link>
      </article>
    );
  }
  return <article className={className}>{body}</article>;
}
