"use client";

import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PRODUCTS", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "JOURNAL", href: "#" },
  { label: "CONTACT", href: "#" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Flip once the Hero (100dvh) has scrolled out from under the header, so the header's
      // color always matches whichever section is actually behind it.
      setScrolled(window.scrollY > window.innerHeight - 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <a href="/" className={styles.logo}>
        SONIC&deg;
      </a>

      <nav className={styles.nav} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={link.label === "HOME" ? styles.navLinkActive : styles.navLink}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#" className={styles.shopPill}>
        <span>SHOP NOW</span>
        <span className={styles.shopArrow} aria-hidden="true">
          &rarr;
        </span>
      </a>
    </header>
  );
}
