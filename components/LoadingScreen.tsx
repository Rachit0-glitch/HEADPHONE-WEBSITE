"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

type Phase = "hold" | "wipe" | "fade" | "done";

const HOLD_MS = 900;
const WIPE_MS = 700;
const FADE_MS = 400;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hold");

  useEffect(() => {
    const toWipe = setTimeout(() => setPhase("wipe"), HOLD_MS);
    const toFade = setTimeout(() => setPhase("fade"), HOLD_MS + WIPE_MS);
    const toDone = setTimeout(() => setPhase("done"), HOLD_MS + WIPE_MS + FADE_MS);
    return () => {
      clearTimeout(toWipe);
      clearTimeout(toFade);
      clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.overlay} ${phase === "wipe" ? styles.isWiping : ""} ${
        phase === "fade" ? styles.isFading : ""
      }`}
      aria-hidden="true"
    >
      <span className={styles.brand}>SONIC&deg;</span>
      <div className={styles.wipePanel} />
    </div>
  );
}
