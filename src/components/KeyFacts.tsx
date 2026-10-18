/** A definition list of plain facts. Compact, quotable, and easy for search and AI systems to extract. */
export function KeyFacts({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Array<{ term: string; detail: React.ReactNode }>;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24">
      <h2
        id={headingId}
        className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
      >
        {title}
      </h2>
      <dl className="mt-5 divide-y divide-white/8 overflow-hidden rounded-3xl border border-white/8 bg-surface">
        {items.map((item) => (
          <div
            key={item.term}
            className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:px-7"
          >
            <dt className="text-sm font-medium text-white">{item.term}</dt>
            <dd className="text-sm leading-relaxed text-muted sm:text-base">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
