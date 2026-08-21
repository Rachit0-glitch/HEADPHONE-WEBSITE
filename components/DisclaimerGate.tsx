"use client";

import { useState } from "react";
import styles from "./DisclaimerGate.module.css";

const DISCLAIMER_TEXT =
  "This is a creative demo by AEVUM, showcasing front-end design and development craft. SONIC, " +
  "the headphone brand shown here, is entirely fictional — invented purely for portfolio " +
  "purposes. No real company, product, or website is being copied or represented as genuine. " +
  "If any element too closely resembles protected work, get in touch and it will be reviewed " +
  "promptly. By continuing, you acknowledge this is a design showcase, not a live product.";

export default function DisclaimerGate({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(false);

  if (!accepted) {
    return (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
        <div className={styles.panel}>
          <div className={styles.brandCol}>
            <span className={styles.brand}>SONIC&deg;</span>
            <h2 id="disclaimer-title" className={styles.title}>
              Before You Continue
            </h2>
          </div>
          <div className={styles.bodyCol}>
            <p className={styles.body}>{DISCLAIMER_TEXT}</p>
            <button type="button" className={styles.button} onClick={() => setAccepted(true)}>
              <span>I Understand &mdash; Enter Site</span>
              <span className={styles.buttonArrow} aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
