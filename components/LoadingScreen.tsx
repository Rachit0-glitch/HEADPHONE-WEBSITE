"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

type Phase = "hold" | "fill" | "fade" | "done";

const HOLD_MS = 300;
const FILL_MS = 1200;
const FADE_MS = 400;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    const toFill = setTimeout(() => setPhase("fill"), HOLD_MS);
    const toFade = setTimeout(() => setPhase("fade"), HOLD_MS + FILL_MS);
    const toDone = setTimeout(() => setPhase("done"), HOLD_MS + FILL_MS + FADE_MS);
    return () => {
      clearTimeout(toFill);
      clearTimeout(toFade);
      clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  const isFilling = phase === "fill" || phase === "fade";

  return (
    <div className={`${styles.overlay} ${phase === "fade" ? styles.isFading : ""}`} aria-hidden="true">
      <div className={styles.brandWrap}>
        <span className={styles.brandBase}>SONIC&deg;</span>
        <span className={`${styles.brandFill} ${isFilling ? styles.isFilling : ""}`}>SONIC&deg;</span>
      </div>
    </div>
  );
}
