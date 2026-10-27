import { AppStoreBadge } from "@/components/AppStoreBadge";
import { GooglePlayButton } from "@/components/GooglePlayButton";
import { onIphone, showAppStoreBadge, withBadge } from "@/lib/iphone";
import { siteConfig } from "@/lib/site";

/** Closing call to action for content pages. Same visual language as the home page's download card. */
export function CtaBanner({
  title = onIphone("Get IronBuddy for Android and iPhone", "Get IronBuddy on Google Play"),
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-surface px-6 py-10 text-center sm:px-12 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(183,255,42,0.14),transparent_55%)]" />
      <div className="relative">
        <h2
          id="cta-heading"
          className="text-2xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {children ??
            `Free to download with a ${siteConfig.freeTrialDays}-day free trial. After the trial, make a one-time purchase to keep it all unlocked. No account, no ads, no subscription.`}
        </p>
        <div className={withBadge("mt-7 flex items-center justify-center gap-3", "mt-7 flex justify-center")}>
          <GooglePlayButton lazy compact={showAppStoreBadge} />
          <AppStoreBadge lazy compact />
        </div>
      </div>
    </section>
  );
}

/** Download badge with the pricing model spelled out, for the top of a content page. */
export function HeroCta() {
  return (
    <div className="flex flex-col items-start gap-3">
      {withBadge(
        <div className="flex items-center gap-3">
          <GooglePlayButton compact={showAppStoreBadge} />
          <AppStoreBadge compact />
        </div>,
        <GooglePlayButton />,
      )}
      <p className="text-xs text-muted">
        {siteConfig.freeTrialDays}-day free trial, then a one-time purchase · No subscription
      </p>
    </div>
  );
}
