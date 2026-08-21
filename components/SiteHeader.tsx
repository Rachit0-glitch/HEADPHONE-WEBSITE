import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PRODUCTS", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "JOURNAL", href: "#" },
  { label: "CONTACT", href: "#" },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
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
