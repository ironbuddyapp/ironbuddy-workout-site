import Link from "next/link";
import { Icon } from "@/components/icons";
import type { PageDef } from "@/lib/pages";

/** Descriptive internal links to related pages: gives crawlers topical anchor text and readers a next step. */
export function RelatedLinks({
  id = "related",
  title = "Keep reading",
  items,
}: {
  /** Prefix for the heading id; set it when a page has more than one RelatedLinks block. */
  id?: string;
  title?: string;
  items: PageDef[];
}) {
  const headingId = `${id}-heading`;
  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
      >
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((page) => (
          <li key={page.path}>
            <Link
              href={page.path}
              className="group block h-full rounded-2xl border border-white/8 bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex items-center justify-between gap-3 text-base font-semibold tracking-tight text-white">
                {page.label}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 shrink-0 text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">{page.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
