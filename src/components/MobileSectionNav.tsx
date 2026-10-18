"use client";

import { useEffect, useState } from "react";
import { sectionNav } from "@/lib/content";
import { cn } from "@/lib/cn";

function sectionFromScroll(): (typeof sectionNav)[number]["id"] {
  const marker = window.innerHeight * 0.32;
  let current: (typeof sectionNav)[number]["id"] = sectionNav[0].id;

  for (const item of sectionNav) {
    const node = document.getElementById(item.id);
    if (!node) continue;
    if (node.getBoundingClientRect().top <= marker) current = item.id;
  }

  return current;
}

function scrollToSection(id: string) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function MobileSectionNav() {
  const [active, setActive] = useState<(typeof sectionNav)[number]["id"]>(
    sectionNav[0].id,
  );

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)");
    let attached = false;
    let ticking = false;

    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(sectionFromScroll());
        ticking = false;
      });
    };

    const attach = () => {
      if (attached || !mobile.matches) return;
      attached = true;
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };

    const onBreakpoint = () => {
      if (mobile.matches) attach();
      else detach();
    };

    onBreakpoint();
    mobile.addEventListener("change", onBreakpoint);
    return () => {
      detach();
      mobile.removeEventListener("change", onBreakpoint);
    };
  }, []);

  return (
    <nav
      data-mobile-section-nav
      aria-label="Page sections"
      className="pointer-events-none fixed inset-y-0 right-0 z-40 flex items-center lg:hidden"
    >
      <ul className="pointer-events-auto flex flex-col items-center py-2 pr-[max(0.35rem,env(safe-area-inset-right))]">
        {sectionNav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Go to ${item.label}`}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(item.id);
                  scrollToSection(item.id);
                }}
                className="flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "h-3 w-3 bg-primary shadow-[0_0_14px_rgba(183,255,42,0.85)]"
                      : "h-2.5 w-2.5 border-[1.5px] border-white/50 bg-transparent",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
