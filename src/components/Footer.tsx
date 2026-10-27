import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { footerGroups } from "@/lib/content";
import { appStoreUrl, iphoneListingLive, withBadge } from "@/lib/iphone";
import { siteConfig } from "@/lib/site";

const linkClass = "inline-block py-1.5 transition hover:text-white";

export function Footer() {
  return (
    <footer className="below-fold border-t border-white/8 bg-background">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(6,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          <SocialLinks className="mt-5 justify-start" />
        </div>
        {footerGroups.map((group) => {
          const labelId = `footer-${group.title.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <nav key={group.title} aria-labelledby={labelId}>
              <p
                id={labelId}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
              >
                {group.title}
              </p>
              <ul className="mt-3 text-sm text-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                {group.title === "Company" && siteConfig.playListingLive ? (
                  <li>
                    <a
                      href={siteConfig.playStoreLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      Google Play
                    </a>
                  </li>
                ) : null}
                {group.title === "Company" && iphoneListingLive && appStoreUrl ? (
                  <li>
                    <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      App Store
                    </a>
                  </li>
                ) : null}
                {group.title === "Company" ? (
                  <li>
                    <a
                      href={siteConfig.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      YouTube
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          );
        })}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-white/8 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} IronBuddy. All rights reserved.
        </p>
        <p className="text-xs text-muted">
          {withBadge(
            "Google Play and the Google Play logo are trademarks of Google LLC. Apple, the Apple logo, iPhone and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.",
            "Google Play and the Google Play logo are trademarks of Google LLC.",
          )}
        </p>
      </Container>
    </footer>
  );
}
