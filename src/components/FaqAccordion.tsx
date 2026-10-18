"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons";
import type { Faq } from "@/lib/content";
import { cn } from "@/lib/cn";

export function FaqAccordion({
  items,
  idPrefix = "faq",
  defaultOpen = 0,
}: {
  items: readonly Faq[];
  idPrefix?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-white/8 overflow-hidden rounded-3xl border border-white/8 bg-surface">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left touch-pan-y sm:px-7 sm:py-5"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="text-sm font-medium tracking-tight text-white sm:text-lg">
                  {item.question}
                </span>
                <Icon
                  name="chevronDown"
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition duration-300",
                    isOpen && "rotate-180 text-primary",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-4 pb-4 sm:px-7 sm:pb-5"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
              {item.more ? (
                <Link
                  href={item.more.href}
                  className="mt-2 inline-block text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  {item.more.label} →
                </Link>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
