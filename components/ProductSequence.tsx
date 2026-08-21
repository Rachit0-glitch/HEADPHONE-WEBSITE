"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./ProductSequence.module.css";

type Props = {
  // Pre-rendered elements in sequence order (index 0 = default/first shown). Each color component's
  // own CSS hardcodes which --entrance-N/--exit-N custom properties it reads (see
  // ProductSectionBlue/Black/Green/Beige.module.css), matching its fixed position here.
  states: ReactNode[];
  /** Scroll distance (in viewport-heights) EACH transition between adjacent states spans, on top of
      the one viewport-height needed to hold the sticky panel in place. This only has to be enough to
      give scrolling something to move through — the crossfade itself always plays out at a fixed
      duration (see ProductSequence.module.css's `transition`), not tied to how far or fast the user
      scrolled, so it reads clearly whether they scroll a little or a lot. */
  scrubViewportsPerTransition?: number;
};

export default function ProductSequence({ states, scrubViewportsPerTransition = 0.5 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastTargetIndex = useRef(-1);
  const stateCount = states.length;

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const viewportH = window.innerHeight;
      // Guard against writing a degenerate height if this ever runs before the browser has a real
      // viewport size (observed on first paint in some embedding contexts) — better to skip a frame
      // than collapse the whole scroll zone to 0px.
      if (viewportH <= 0) return;

      const totalScrubViewports = (stateCount - 1) * scrubViewportsPerTransition;
      wrapper.style.height = `${viewportH * (1 + totalScrubViewports)}px`;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - viewportH;
      const normalized = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;
      const rawProgress = normalized * (stateCount - 1);

      // Snap to whichever state's "zone" the raw scroll position is currently in, rather than driving
      // every intermediate blend continuously — crossing the halfway point between two states (however
      // little or much was actually scrolled to get there) always plays the full, fixed-duration
      // crossfade to that neighboring state, so the animation reads the same whether the user scrolled
      // once or ten times to get there. The `transition` declared on `.sticky` in the CSS is what
      // actually animates each entrance/exit custom property smoothly once its target value changes.
      const targetIndex = Math.round(rawProgress);
      if (targetIndex === lastTargetIndex.current) return;
      lastTargetIndex.current = targetIndex;

      for (let i = 0; i < stateCount; i++) {
        // entrance_i flips on once we've reached state i or later; exit_i flips on once we've moved
        // past it (to state i+1 or later). State 0's entrance is always 1 (targetIndex >= 0 always
        // holds); the last state's exit is always 0 (targetIndex never reaches stateCount).
        const entrance = targetIndex >= i ? 1 : 0;
        const exit = targetIndex >= i + 1 ? 1 : 0;
        sticky.style.setProperty(`--entrance-${i}`, String(entrance));
        sticky.style.setProperty(`--exit-${i}`, String(exit));
      }
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    // Deferred (not called synchronously in the effect body) so the very first measurement happens
    // after the browser has committed initial layout, not mid-hydration.
    const rafId = requestAnimationFrame(update);
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
