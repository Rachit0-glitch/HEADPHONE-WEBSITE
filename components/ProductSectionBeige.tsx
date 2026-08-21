import Image from "next/image";
import styles from "./ProductSectionBeige.module.css";

const SOCIAL_LINKS = [
  { name: "Facebook", src: "/product-beige/social-facebook.png" },
  { name: "Instagram", src: "/product-beige/social-instagram.png" },
  { name: "Twitter", src: "/product-beige/social-twitter.png" },
  { name: "YouTube", src: "/product-beige/social-youtube.png" },
];

// Always index 3 (currently the last state) in the Blue->Black->Green->Beige sequence — its CSS
// reads --entrance-3/--exit-3 directly, no role prop needed.
export default function ProductSectionBeige() {
  return (
    <div className={styles.wrap}>
      {/* Floating spheres + product photo, positioned as percentages of the 1672x941 Figma canvas —
          this export's icons/scroll-arrows are pre-composited onto their own circle (like Black's),
          so they're placed as images directly rather than vector circle + glyph. */}
      <div className={styles.sphereGlass} aria-hidden="true">
        <Image src="/product-beige/sphere-glass.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereLeftMed} aria-hidden="true">
        <Image src="/product-beige/sphere-left-med.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereLeftSmall} aria-hidden="true">
        <Image src="/product-beige/sphere-left-small.png" alt="" fill sizes="4vw" />
      </div>

      <div className={styles.headphone} aria-hidden="true">
        <Image src="/product-beige/product-headphone.png" alt="SONIC wireless headphones" fill sizes="32vw" priority />
      </div>

      <div className={styles.sphereTopRight} aria-hidden="true">
        <Image src="/product-beige/sphere-top-right.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereMidRight} aria-hidden="true">
        <Image src="/product-beige/sphere-mid-right.png" alt="" fill sizes="5vw" />
      </div>
      <div className={styles.sphereTinyRight} aria-hidden="true">
        <Image src="/product-beige/sphere-tiny-right.png" alt="" fill sizes="3vw" />
      </div>
      <div className={styles.sphereBottomRight} aria-hidden="true">
        <Image src="/product-beige/sphere-bottom-right.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereBottomCenter} aria-hidden="true">
        <Image src="/product-beige/sphere-bottom-center.png" alt="" fill sizes="4vw" />
      </div>

      {/* ---- UI chrome (nav/logo/shop-pill live once in the shared, fixed SiteHeader) ---- */}
      <div className={styles.leftColumn}>
        <h1 className={styles.headline}>
          <span className={styles.bright}>NEUTRAL</span>
          <span className={styles.bright}>TONE</span>
          <span className={styles.hidden}>BOLD</span>
          <span className={styles.hidden}>PRESENCE</span>
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

      {/* Decorative only — no href/onClick, since ProductSequence owns scrolling between variants. */}
      <div className={styles.scrollUp} aria-hidden="true">
        <Image src="/product-beige/scroll-up.png" alt="" fill sizes="4vw" />
      </div>
      <div className={styles.scrollDown} aria-hidden="true">
        <Image src="/product-beige/scroll-down.png" alt="" fill sizes="4vw" />
      </div>

      <div className={styles.followRow}>
        <span className={styles.followText}>Follow Us</span>
        <div className={styles.socialIcons}>
          {SOCIAL_LINKS.map((social) => (
            <div key={social.name} className={styles.socialIcon} aria-hidden="true">
              <Image src={social.src} alt="" fill sizes="4vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
