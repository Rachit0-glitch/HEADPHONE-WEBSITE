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
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Below the mobile breakpoint (see .menuToggle's media query) the 5-link row + logo + Shop Now
  // pill can't fit on one line the way the desktop layout does, so it collapses into this toggle +
  // full-screen panel instead. Locking body scroll while it's open keeps the page from scrolling
  // underneath the (non-scrollable) panel.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}>
      <a href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
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

      <button
        type="button"
        className={styles.menuToggle}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.menuToggleBar} aria-hidden="true" />
        <span className={styles.menuToggleBar} aria-hidden="true" />
      </button>

      <nav
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Primary"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={link.label === "HOME" ? styles.mobileNavLinkActive : styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#" className={styles.mobileShopPill} onClick={() => setMenuOpen(false)}>
          <span>SHOP NOW</span>
          <span className={styles.shopArrow} aria-hidden="true">
            &rarr;
          </span>
        </a>
      </nav>
    </header>
  );
}
