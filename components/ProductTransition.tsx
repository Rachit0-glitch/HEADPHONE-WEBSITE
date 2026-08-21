"use client";

import { useEffect, useRef } from "react";
import ProductSectionBlue from "./ProductSectionBlue";
import ProductSectionBlack from "./ProductSectionBlack";
import styles from "./ProductTransition.module.css";

// How much extra scroll distance (in viewport-heights) the Blue->Black scrub takes, on top of the
// one viewport-height needed to hold the sticky panel in place. 1 = a brisk transition, 2 = slower.
const SCRUB_VIEWPORTS = 1.15;

export default function ProductTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const blue = blueRef.current;
      const black = blackRef.current;
      if (!wrapper || !blue || !black) return;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - window.innerHeight;
      const progress = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;

      // Blue scrolls fully up and out; Black rises from just below the viewport into place —
      // both driven directly by scroll position, not a timed animation, so it tracks the scrollbar
      // (and reverses cleanly on scroll-up) exactly like the brief asked for.
      blue.style.transform = `translate3d(0, ${-progress * 100}%, 0)`;
      black.style.transform = `translate3d(0, ${(1 - progress) * 100}%, 0)`;
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} style={{ height: `${100 + SCRUB_VIEWPORTS * 100}dvh` }}>
      <div className={styles.sticky}>
        <div ref={blueRef} className={styles.panel}>
          <ProductSectionBlue />
        </div>
        <div ref={blackRef} className={styles.panel} style={{ transform: "translate3d(0, 100%, 0)" }}>
          <ProductSectionBlack />
        </div>
      </div>
    </div>
  );
}
