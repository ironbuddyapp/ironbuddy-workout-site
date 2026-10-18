"use client";

import { useEffect, useRef, useState } from "react";
import { sectionNav } from "@/lib/content";

const STEP_MS = 4000;
const SETTLE_MS = 900;

type SectionId = (typeof sectionNav)[number]["id"];

function sectionIndexFromScroll() {
  const marker = window.innerHeight * 0.32;
  let index = 0;

  sectionNav.forEach((item, i) => {
    const node = document.getElementById(item.id);
    if (node && node.getBoundingClientRect().top <= marker) index = i;
  });

  return index;
}

function scrollToSection(id: SectionId) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function ExploreIronBuddyButton() {
  const [running, setRunning] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const settleRef = useRef<number | null>(null);
  const programmaticRef = useRef(false);
  const runningRef = useRef(false);

  const clearTimers = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (settleRef.current !== null) {
      window.clearTimeout(settleRef.current);
      settleRef.current = null;
    }
    programmaticRef.current = false;
  };

  const stop = () => {
    clearTimers();
    runningRef.current = false;
    setRunning(false);
  };

  const advance = () => {
    const next = indexRef.current + 1;
    if (next >= sectionNav.length) {
      stop();
      return;
    }

    indexRef.current = next;
    programmaticRef.current = true;
    scrollToSection(sectionNav[next].id);
    if (settleRef.current !== null) window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      programmaticRef.current = false;
      settleRef.current = null;
    }, SETTLE_MS);
  };

  const start = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollToSection("features");
      return;
    }

    clearTimers();
    let current = sectionIndexFromScroll();
    if (current >= sectionNav.length - 1) current = 0;
    indexRef.current = current;
    runningRef.current = true;
    setRunning(true);
    advance();
    timerRef.current = window.setInterval(advance, STEP_MS);
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) stop();
    };

    const onInteract = () => {
      if (!runningRef.current || programmaticRef.current) return;
      stop();
    };

    desktop.addEventListener("change", onDesktop);
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("wheel", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);
    window.addEventListener("pointerdown", onInteract);

    return () => {
      desktop.removeEventListener("change", onDesktop);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      clearTimers();
      runningRef.current = false;
    };
  }, []);

  return (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
      aria-pressed={running}
      aria-label="Explore IronBuddy"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={start}
    >
      Explore IronBuddy
    </button>
  );
}
