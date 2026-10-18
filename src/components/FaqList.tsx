import { TextLink } from "@/components/content";
import type { Faq } from "@/lib/content";

/**
 * A fully expanded FAQ. Unlike the accordion, every answer is visible and in the HTML without JavaScript,
 * and each question has an anchor (/faq/#offline) that can be linked to directly.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-white/8 overflow-hidden rounded-3xl border border-white/8 bg-surface">
      {items.map((item) => (
        <div key={item.id} id={item.id} className="scroll-mt-24 px-5 py-5 sm:px-7 sm:py-6">
          <h3 className="text-base font-medium tracking-tight text-white sm:text-lg">
            {item.question}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {item.answer}
          </p>
          {item.more ? (
            <p className="mt-3 text-sm">
              <TextLink href={item.more.href}>{item.more.label} →</TextLink>
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
