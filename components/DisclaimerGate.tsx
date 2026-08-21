"use client";

import { useState } from "react";
import styles from "./DisclaimerGate.module.css";

const DISCLAIMER_TEXT =
  "This site is a creative demonstration built by AEVUM to showcase interactive design and " +
  "front-end development craft — motion, layout, and interface work created purely for " +
  "portfolio purposes. SONIC, the headphone brand shown throughout, is entirely fictional and " +
  "was invented solely to give this demo a coherent creative context. Nothing here represents a " +
  "real, purchasable product, and no existing company, brand, or website is being copied, " +
  "imitated, or passed off as original. Any resemblance to real-world design patterns is " +
  "coincidental, or simply the natural result of shared, common conventions in modern web design " +
  "— not an attempt to reproduce or publish someone else's work as our own. This project " +
  "exists to illustrate what AEVUM can build for real clients: layouts, animations, and " +
  "interactions crafted from scratch. It is not for sale, not affiliated with any headphone " +
  "manufacturer, and not intended for commercial distribution in its current form. If you believe " +
  "any element here too closely resembles protected work and would like it reviewed or removed, " +
  "please get in touch and it will be addressed promptly. By continuing, you acknowledge this is " +
  "a design portfolio piece, not a live commercial product.";

export default function DisclaimerGate({ children }: { children: React.ReactNode }) {
  const [accepted, setAccepted] = useState(false);

  if (!accepted) {
    return (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
        <div className={styles.panel}>
          <span className={styles.brand}>SONIC&deg;</span>
          <h2 id="disclaimer-title" className={styles.title}>
            Before You Continue
          </h2>
          <p className={styles.body}>{DISCLAIMER_TEXT}</p>
          <button type="button" className={styles.button} onClick={() => setAccepted(true)}>
            <span>I Understand &mdash; Enter Site</span>
            <span className={styles.buttonArrow} aria-hidden="true">
              &rarr;
            </span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
