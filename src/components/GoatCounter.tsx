"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureCampaign, retagPlayLink } from "@/lib/play-campaign";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    goatcounter?: { count: (vars: { path?: string; title?: string; event?: boolean }) => void };
  }
}

/** Links to IronBuddy's own Play listing: the web URL (tagged or not) and the in-app-browser intent. */
function isGooglePlayLink(href: string) {
  return (
    href.startsWith(siteConfig.playStoreUrl) ||
    href.startsWith(`intent://details?id=${siteConfig.playStoreId}`)
  );
}

/**
 * Website analytics with GoatCounter (https://www.goatcounter.com): no cookies, nothing stored in the browser,
 * no IP addresses stored. It reads utm_source and utm_campaign from the address on its own. The app has no
 * analytics; this covers workout.ironbuddy.fit only.
 */
export function GoatCounter() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // count.js counts the page the visitor lands on. After that, Next.js changes pages without reloading the
  // browser, which count.js does not see, so each later page is counted here.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.goatcounter?.count({ path: window.location.pathname });
  }, [pathname]);

  // One listener for every Google Play badge and link on the site, so no button has to remember to count or tag.
  // count.js sends with sendBeacon, so the click is still recorded when the link leaves the page. Before the link
  // opens, its referrer gets the visit's campaign tags (src/lib/play-campaign.ts), read on the first page of the visit.
  useEffect(() => {
    captureCampaign();
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      if (link && isGooglePlayLink(href)) {
        const tagged = retagPlayLink(href);
        if (tagged && tagged !== href) link.setAttribute("href", tagged);
        window.goatcounter?.count({ event: true, path: "click-google-play" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <Script
      src="//gc.zgo.at/count.js"
      data-goatcounter={siteConfig.goatcounterUrl}
      strategy="afterInteractive"
    />
  );
}
