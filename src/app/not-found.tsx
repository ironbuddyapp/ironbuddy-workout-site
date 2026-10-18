import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { pages } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const suggestions = [pages.home, pages.features, pages.faq, pages.guides, pages.privacy];

export default function NotFound() {
  return (
    <main id="main">
      <Container>
        <div className="mx-auto max-w-2xl py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            That page does not exist or has moved. These pages might help.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {suggestions.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="inline-flex min-h-11 items-center rounded-full border border-white/12 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
