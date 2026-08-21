import Image from "next/image";
import styles from "./ProductSection.module.css";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PRODUCTS", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "JOURNAL", href: "#" },
  { label: "CONTACT", href: "#" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", src: "/product/social-facebook.png" },
  { name: "Instagram", src: "/product/social-instagram.png" },
  { name: "Twitter", src: "/product/social-twitter.png" },
  { name: "YouTube", src: "/product/social-youtube.png" },
];

export default function ProductSection() {
  return (
    <div className={styles.wrap}>
      {/* ---- Floating spheres + product photo, positioned as percentages of the 1672x941 Figma
          canvas. No cropping concerns here (unlike the Hero's photo background) since the backdrop
          is a pure CSS radial-gradient, which fills any viewport exactly. ---- */}
      <div className={styles.sphereGrey} aria-hidden="true">
        <Image src="/product/sphere-grey.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereLeftMed} aria-hidden="true">
        <Image src="/product/sphere-left-med.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereLeftSmall} aria-hidden="true">
        <Image src="/product/sphere-left-small.png" alt="" fill sizes="4vw" />
      </div>

      <div className={styles.headphone} aria-hidden="true">
        <Image src="/product/product-headphone.png" alt="SONIC wireless headphones" fill sizes="30vw" priority />
      </div>

      <div className={styles.sphereTopRight} aria-hidden="true">
        <Image src="/product/sphere-top-right.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereMidRight} aria-hidden="true">
        <Image src="/product/sphere-mid-right.png" alt="" fill sizes="5vw" />
      </div>
      <div className={styles.sphereTinyRight} aria-hidden="true">
        <Image src="/product/sphere-tiny-right.png" alt="" fill sizes="3vw" />
      </div>
      <div className={styles.sphereBottomRight} aria-hidden="true">
        <Image src="/product/sphere-bottom-right.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereBottomCenter} aria-hidden="true">
        <Image src="/product/sphere-bottom-center.png" alt="" fill sizes="4vw" />
      </div>

      {/* ---- UI chrome ---- */}
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

      <div className={styles.leftColumn}>
        <h1 className={styles.headline}>
          <span className={styles.bright}>PAINT</span>
          <span className={styles.bright}>THE SILENCE</span>
          <span className={styles.hidden}>HEAR THE</span>
          <span className={styles.hidden}>DARK</span>
        </h1>

        <p className={styles.subtext}>
          Premium Wireless
          <br />
          Headphones
        </p>

        <p className={styles.paragraph}>
          Engineered for immersive sound and crafted for comfort. Our headphones deliver pure audio,
          powerful bass, and total focus &mdash; anywhere.
        </p>
      </div>

      <a href="#" className={styles.scrollUp} aria-label="Scroll up">
        &uarr;
      </a>
      <a href="#" className={styles.scrollDown} aria-label="Scroll down">
        &darr;
      </a>

      <div className={styles.followRow}>
        <span className={styles.followText}>Follow Us</span>
        <div className={styles.socialIcons}>
          {SOCIAL_LINKS.map((social) => (
            <a key={social.name} href="#" className={styles.socialIcon} aria-label={social.name}>
              <Image src={social.src} alt="" fill sizes="4vw" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
