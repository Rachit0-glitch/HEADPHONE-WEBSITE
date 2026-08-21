"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./ProductSequence.module.css";

type Props = {
  // Pre-rendered elements in sequence order (index 0 = default/first shown). Each color component's
  // own CSS hardcodes which --entrance-N/--exit-N custom properties it reads (see
  // ProductSectionBlue/Black/Green.module.css), matching its fixed position here.
  states: ReactNode[];
  /** Extra scroll distance (in viewport-heights) EACH transition between adjacent states takes, on
      top of the one viewport-height needed to hold the sticky panel in place. 0.3 (a single wheel
      notch or trackpad swipe) felt too fast/abrupt; 0.6 gives a more deliberate, easier-to-follow
      crossfade while still being clearly faster than the original 1.15. */
  scrubViewportsPerTransition?: number;
};

export default function ProductSequence({ states, scrubViewportsPerTransition = 0.6 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stateCount = states.length;

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const viewportH = window.innerHeight;
      // Guard against writing a degenerate height if this ever runs before the browser has a real
      // viewport size (observed on first paint in some embedding contexts) — better to skip a frame
      // than collapse the whole scroll zone to 0px, which is what silently created an extra blank
      // "section" below the pinned content previously.
      if (viewportH <= 0) return;

      const totalScrubViewports = (stateCount - 1) * scrubViewportsPerTransition;
      wrapper.style.height = `${viewportH * (1 + totalScrubViewports)}px`;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - viewportH;
      const normalized = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;
      // 0 at "fully state 0", (stateCount - 1) at "fully the last state" — each integer step is one
      // state fully shown, with the fractional part blending it into its neighbor.
      const overallProgress = normalized * (stateCount - 1);

      for (let i = 0; i < stateCount; i++) {
        const entrance = Math.min(Math.max(overallProgress - (i - 1), 0), 1);
        const exit = Math.min(Math.max(overallProgress - i, 0), 1);
        sticky.style.setProperty(`--entrance-${i}`, entrance.toFixed(4));
        sticky.style.setProperty(`--exit-${i}`, exit.toFixed(4));
      }
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    }

    // Deferred (not called synchronously in the effect body) so the very first measurement happens
    // after the browser has committed initial layout, not mid-hydration.
    rafId = requestAnimationFrame(update);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [stateCount, scrubViewportsPerTransition]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>
        {states}
      </div>
    </div>
  );
}
