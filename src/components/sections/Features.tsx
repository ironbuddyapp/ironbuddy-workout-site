import Link from "next/link";
import { Container } from "@/components/Container";
import { FeatureCard } from "@/components/FeatureCard";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { features } from "@/lib/content";
import { pages } from "@/lib/pages";

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
        <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-4 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70}>
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
