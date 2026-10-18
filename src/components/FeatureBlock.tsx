import Link from "next/link";
import { AppScreen, PhoneMockup } from "@/components/PhoneMockup";
import type { ScreenshotId } from "@/lib/content";
import { cn } from "@/lib/cn";

/** A feature explained in words next to the real screen it describes. */
export function FeatureBlock({
  id,
  title,
  shot,
  flip = false,
  more,
  children,
}: {
  id: string;
  title: string;
  shot: ScreenshotId;
  flip?: boolean;
  /** A page that goes deeper, shown as a link under the text. */
  more?: { href: string; label: string };
  children: React.ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-[1fr_292px] lg:gap-16"
    >
      <div className={cn(flip && "lg:order-2")}>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
        >
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
          {children}
        </div>
        {more && (
          <Link
            href={more.href}
            className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary transition hover:text-white"
          >
            {more.label}
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      <PhoneMockup className={cn(flip && "lg:order-1")}>
        <AppScreen id={shot} />
      </PhoneMockup>
    </section>
  );
}
