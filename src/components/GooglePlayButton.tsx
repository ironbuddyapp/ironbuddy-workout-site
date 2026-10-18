"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const IN_APP_BROWSER = /FBAN|FBAV|FB_IAB|Instagram|TikTok|Bytedance|musical_ly|Twitter|Pinterest|Snapchat|Line\/|GSA\//i;

export function GooglePlayButton({
  className,
  compact = false,
  lazy = false,
}: {
  className?: string;
  compact?: boolean;
  /** Set for instances below the fold so the badge does not compete with the hero image. */
  lazy?: boolean;
}) {
  const [href, setHref] = useState<string>(siteConfig.playStoreLinkUrl);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua) && IN_APP_BROWSER.test(ua)) {
      setHref(siteConfig.playStoreIntent);
    }
  }, []);

  const size = compact ? "h-10" : "h-12 sm:h-[53px]";
  const badge = (alt: string) => (
    <img
      src="/badges/google-play-badge.svg"
      alt={alt}
      width={180}
      height={53}
      decoding="async"
      loading={lazy ? "lazy" : undefined}
      className={cn("w-auto", size)}
    />
  );

  // Before launch the badge is shown but is not a link, so nobody lands on Play's "not found" page.
  if (!siteConfig.playListingLive) {
    return (
      <span className={cn("inline-flex items-center justify-center rounded-[13px]", size, className)}>
        {badge("IronBuddy on Google Play, coming soon")}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_self"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-[13px] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size,
        className,
      )}
    >
      {/* The alt text is the link's accessible name and the anchor text search engines read. */}
      {badge("Get IronBuddy on Google Play")}
    </a>
  );
}
