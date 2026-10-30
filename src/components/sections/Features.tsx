import Link from "next/link";
import { Container } from "@/components/Container";
import { FeatureCard } from "@/components/FeatureCard";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { features } from "@/lib/content";
import { pages } from "@/lib/pages";

/** The first three features (log, splits, progress) are the core of the app and get the large cards. */
const coreFeatures = 3;

export function Features() {
  return (
    <section id="features" className="max-lg:scroll-mt-0 max-lg:py-0 lg:scroll-mt-24 lg:py-20 sm:py-28">
      <Container className="flex h-full min-h-0 flex-col justify-center">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything a gym log needs. Nothing it doesn't."
            description="IronBuddy is a workout tracker built around logging, programming, progress, and privacy, all working offline with no account."
          />
        </Reveal>
        <div className="mt-4 grid gap-2 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {features.slice(0, coreFeatures).map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70} className="h-full">
              <FeatureCard {...feature} featured />
            </Reveal>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-4">
          {features.slice(coreFeatures).map((feature, index) => (
            <Reveal key={feature.title} delay={(coreFeatures + index) * 70} className="h-full">
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
        <div className="mt-2 text-center sm:mt-8">
          <Link
            href={pages.features.path}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-primary transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Explore all features
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
