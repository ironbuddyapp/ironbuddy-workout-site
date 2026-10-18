import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.2-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function durationLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * The two-minute tour on YouTube, as a link. The thumbnail is served from this site, so nothing is
 * requested from Google until the visitor clicks; that keeps the privacy policy true as written.
 */
export function VideoCard({
  variant = "wide",
  className,
}: {
  /** "wide" stacks the thumbnail over the text; "compact" puts a small thumbnail beside it. */
  variant?: "wide" | "compact";
  className?: string;
}) {
  const video = siteConfig.promoVideo;
  const minutes = Math.round(video.durationSeconds / 60);
  const compact = variant === "compact";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch the ${minutes}-minute IronBuddy tour on YouTube (opens in a new tab)`}
      className={cn(
        "group block rounded-3xl border border-white/8 bg-surface text-left transition duration-300 hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        compact ? "flex items-center gap-4 p-3" : "overflow-hidden",
        className,
      )}
    >
      <span
        className={cn(
          "relative block overflow-hidden bg-black",
          compact ? "aspect-video w-32 shrink-0 rounded-xl sm:w-40" : "aspect-video w-full",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
        <img
          src={video.thumbnail}
          width={video.thumbnailWidth}
          height={video.thumbnailHeight}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/30 transition duration-300 group-hover:bg-primary group-hover:text-black",
              compact ? "h-9 w-9" : "h-14 w-14 sm:h-16 sm:w-16",
            )}
          >
            <PlayIcon className={compact ? "h-4 w-4 translate-x-px" : "h-7 w-7 translate-x-0.5"} />
          </span>
        </span>
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">
          {durationLabel(video.durationSeconds)}
        </span>
      </span>
      <span className={cn("block min-w-0", !compact && "p-5 sm:p-6")}>
        <span className={cn("block font-semibold tracking-tight text-white", compact ? "text-sm sm:text-base" : "text-lg")}>
          Watch the {minutes}-minute tour
        </span>
        <span
          className={cn(
            "mt-1 block leading-relaxed text-muted",
            compact ? "text-xs max-sm:hidden sm:text-sm" : "text-sm sm:text-[15px]",
          )}
        >
          Your week, logging a workout, progress, splits and your dashboard.
        </span>
        <span className="mt-1.5 block text-xs text-muted/80">Opens YouTube in a new tab</span>
      </span>
    </a>
  );
}
