import { cn } from "@/lib/cn";
import { appStoreUrl, iphoneListingLive } from "@/lib/iphone";

/**
 * Apple's "Download on the App Store" badge, next to the Google Play badge. Renders nothing while the iPhone
 * switch is off. With the switch on and no App Store address yet, it is a plain image: no link, no pointer, no
 * focus stop, so it never looks like a button that does nothing. Use Apple's own artwork only
 * (public/badges/app-store-badge.svg, from Apple's marketing tools), never a redrawn badge.
 */
export function AppStoreBadge({
  className,
  compact = false,
  lazy = false,
}: {
  className?: string;
  compact?: boolean;
  /** Set for instances below the fold so the badge does not compete with the hero image. */
  lazy?: boolean;
}) {
  if (!iphoneListingLive) return null;

  const size = compact ? "h-10" : "h-12 sm:h-[53px]";
  const badge = (alt: string) => (
    <img
      src="/badges/app-store-badge.svg"
      alt={alt}
      width={159}
      height={53}
      decoding="async"
      loading={lazy ? "lazy" : undefined}
      className={cn("w-auto", size)}
    />
  );

  if (!appStoreUrl) {
    return (
      <span className={cn("inline-flex items-center justify-center", size, className)}>
        {badge("IronBuddy: Workout Tracker on the App Store")}
      </span>
    );
  }

  return (
    <a
      href={appStoreUrl}
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size,
        className,
      )}
    >
      {badge("Download IronBuddy on the App Store")}
    </a>
  );
}
