import Link from "next/link";
import { Container } from "@/components/Container";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { VideoCard } from "@/components/VideoCard";
import { showAppStoreBadge, withBadge } from "@/lib/iphone";
import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site";

export function Download() {
  return (
    <section id="download" className="max-lg:scroll-mt-0 max-lg:justify-center max-lg:py-0 lg:scroll-mt-24 lg:pb-32 lg:pt-8 sm:pb-32">
      <Container className="flex h-full min-h-0 flex-col justify-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface px-6 py-10 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(183,255,42,0.14),transparent_55%)]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Download
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Download IronBuddy: pay once, train forever.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-lg">
                Free to download with a {siteConfig.freeTrialDays}-day free trial. After that, a one-time
                purchase keeps it all unlocked, with no subscription. Your
                workouts are stored on your phone, ready every time you walk into the gym.
              </p>
              <div className={withBadge("mt-8 flex items-center justify-center gap-3", "mt-8 flex justify-center")}>
                <GooglePlayButton lazy compact={showAppStoreBadge} />
                <AppStoreBadge lazy compact />
              </div>
              <div className="mx-auto mt-6 max-w-md sm:mt-8">
                <VideoCard variant="compact" />
              </div>
              <div className="mt-8 flex flex-col items-center gap-5 lg:hidden">
                <SocialLinks />
                <nav
                  aria-label="About and legal"
                  className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted"
                >
                  <Link href={pages.about.path} className="inline-flex min-h-11 items-center transition hover:text-white">
                    About
                  </Link>
                  <Link href={pages.privacy.path} className="inline-flex min-h-11 items-center transition hover:text-white">
                    Privacy Policy
                  </Link>
                  <Link href={pages.contact.path} className="inline-flex min-h-11 items-center transition hover:text-white">
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
