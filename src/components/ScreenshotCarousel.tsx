"use client";

import { useEffect, useRef, useState } from "react";
import { AppScreen, PhoneMockup } from "@/components/PhoneMockup";
import { Icon } from "@/components/icons";
import { appScreenshots as screenshots } from "@/lib/content";
import { cn } from "@/lib/cn";

export function ScreenshotCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = items.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { root, threshold: 0.6 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    setActive(index);
    const root = scrollerRef.current;
    const target = root?.querySelectorAll<HTMLElement>("[data-slide]")[index];
    target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="relative flex h-full min-h-0 flex-col justify-center">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 pt-2 sm:gap-8 sm:px-8"
        role="region"
        aria-roledescription="carousel"
        aria-label="App screenshots"
        data-screenshot-scroller
      >
        {screenshots.map((shot, index) => (
          <figure
            key={shot.id}
            data-slide
            className="snap-center shrink-0"
            aria-label={`${index + 1} of ${screenshots.length}: ${shot.label}`}
          >
            <PhoneMockup className="max-lg:w-[10.5rem]">
              <AppScreen id={shot.id} />
            </PhoneMockup>
            <figcaption className="mt-2 text-center text-sm font-medium text-white lg:mt-5">
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 lg:mt-6">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition hover:border-primary/40 hover:text-primary"
          aria-label="Previous screenshot"
          onClick={() => scrollTo(Math.max(active - 1, 0))}
        >
          <Icon name="chevronLeft" className="h-5 w-5" />
        </button>
        <div className="flex" role="tablist" aria-label="Screenshot slides">
          {screenshots.map((shot, index) => (
            <button
              key={shot.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={shot.label}
              className="group flex h-6 min-w-6 items-center justify-center px-1"
              onClick={() => scrollTo(index)}
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition",
                  active === index
                    ? "w-7 bg-primary"
                    : "w-2 bg-white/20 group-hover:bg-white/40",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition hover:border-primary/40 hover:text-primary"
          aria-label="Next screenshot"
          onClick={() => scrollTo(Math.min(active + 1, screenshots.length - 1))}
        >
          <Icon name="chevronRight" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
