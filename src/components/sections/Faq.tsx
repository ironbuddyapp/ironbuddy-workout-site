import Link from "next/link";
import { Container } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeFaqs } from "@/lib/content";
import { pages } from "@/lib/pages";

export function Faq() {
  return (
    <section id="faq" className="max-lg:scroll-mt-0 max-lg:py-0 lg:scroll-mt-24 lg:py-20 sm:py-28">
      <Container className="flex h-full min-h-0 flex-col justify-center">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions about offline use, pricing, and privacy."
            description="Straight answers about accounts, offline use, ads, pricing, and where your workout data lives."
          />
        </Reveal>
        <Reveal delay={80} className="mx-auto mt-4 w-full max-w-3xl lg:mt-12">
          <FaqAccordion items={homeFaqs} />
          <div className="mt-2 text-center sm:mt-6">
            <Link
              href={pages.faq.path}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-primary transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              See all questions
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
