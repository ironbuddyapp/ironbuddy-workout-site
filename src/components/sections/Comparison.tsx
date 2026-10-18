import Link from "next/link";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { pages } from "@/lib/pages";

const learnMore = [
  { label: "How offline tracking works", href: pages.offline.path },
  { label: "No subscription, no ads", href: pages.noSubscription.path },
  { label: "Privacy in detail", href: pages.privacyFocused.path },
  { label: "Compare workout apps", href: pages.alternatives.path },
] as const;

export function Comparison() {
  return (
    <section id="why" className="max-lg:scroll-mt-0 max-lg:py-0 lg:scroll-mt-24 lg:py-20 sm:py-28">
      <Container className="flex h-full min-h-0 flex-col justify-center">
        <Reveal>
          <SectionHeading
            eyebrow="Compare"
            title="Why choose an offline workout tracker?"
            description="Many fitness apps ask for an account, show ads, or charge a monthly fee. IronBuddy is built around your phone instead: offline, private, and paid for once."
          />
        </Reveal>
        <Reveal delay={90} className="mx-auto mt-4 max-w-4xl lg:mt-12">
          <ComparisonTable />
          <p className="mt-3 text-center text-xs leading-relaxed text-muted">
            IronBuddy&apos;s column reflects its{" "}
            <Link href={pages.privacy.path} className="underline underline-offset-2 hover:text-white">
              privacy policy
            </Link>
            . Other apps differ, so check each app&apos;s Google Play listing before you install.
          </p>
          <nav aria-label="Learn more" className="mt-3 lg:mt-6">
            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
              {learnMore.map((item) => (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    className="flex min-h-11 w-full items-center justify-center rounded-full border border-white/12 px-3 text-center text-xs font-semibold leading-tight text-primary transition hover:border-white/30 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </Container>
    </section>
  );
}
