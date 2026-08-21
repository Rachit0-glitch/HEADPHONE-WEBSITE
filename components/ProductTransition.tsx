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
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - window.innerHeight;
      const progress = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;

      // One custom property, read by both ProductSectionBlue and ProductSectionBlack's CSS (opacity
      // + the headphone's shrink/grow transform) — this drives the whole crossfade purely through the
      // browser's own style recalculation on scroll, no React re-render per scroll tick.
      sticky.style.setProperty("--product-progress", progress.toFixed(4));
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
      <div ref={stickyRef} className={styles.sticky} style={{ "--product-progress": 0 } as React.CSSProperties}>
        <ProductSectionBlue />
        <ProductSectionBlack />
      </div>
    </div>
  );
}
