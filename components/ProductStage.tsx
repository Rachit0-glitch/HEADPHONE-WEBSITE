"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./ProductStage.module.css";

type Props = {
  // Pre-rendered elements (e.g. <ProductSectionBlue role="from" />), not component references —
  // page.tsx is a Server Component, and passing a raw component type as a prop into this Client
  // Component isn't serializable across that boundary (it hung Next's static page generation).
  // Passing already-rendered JSX like this is the supported composition pattern instead.
  from: ReactNode;
  to: ReactNode;
  /** Extra scroll distance (in viewport-heights) the crossfade takes, on top of the one
      viewport-height needed to hold the sticky panel in place. Kept small so one normal scroll
      gesture (wheel notch or trackpad swipe) is enough to carry it through. */
  scrubViewports?: number;
};

export default function ProductStage({ from, to, scrubViewports = 0.3 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      // Wrapper height is set in px from this same window.innerHeight (not a `dvh` CSS string
      // computed independently by the browser) so progress reaches exactly 1.0 at exactly the last
      // scrollable pixel of this stage, with zero leftover gap before the next stage/section begins.
      const viewportH = window.innerHeight;
      wrapper.style.height = `${viewportH * (1 + scrubViewports)}px`;

      const rect = wrapper.getBoundingClientRect();
      const scrubDistance = wrapper.offsetHeight - viewportH;
      const progress = scrubDistance > 0 ? Math.min(Math.max(-rect.top / scrubDistance, 0), 1) : 0;

      // One custom property, read by both From's and To's CSS (opacity + the headphone's
      // shrink/grow transform) via their `[data-role]` selectors — drives the whole crossfade
      // purely through the browser's own style recalculation on scroll, no React re-render per tick.
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
  }, [scrubViewports]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky} style={{ "--product-progress": 0 } as React.CSSProperties}>
        {from}
        {to}
      </div>
    </div>
  );
}
