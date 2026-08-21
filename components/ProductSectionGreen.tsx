import Image from "next/image";
import styles from "./ProductSectionGreen.module.css";

const SOCIAL_LINKS = [
  { name: "Facebook", src: "/product-green/social-facebook.png" },
  { name: "Instagram", src: "/product-green/social-instagram.png" },
  { name: "Twitter", src: "/product-green/social-twitter.png" },
  { name: "YouTube", src: "/product-green/social-youtube.png" },
];

// Always index 2 (the last state, currently) in the Blue->Black->Green sequence — its CSS reads
// --entrance-2/--exit-2 directly, no role prop needed.
export default function ProductSectionGreen() {
  return (
    <div className={styles.wrap}>
      {/* This export's headphone photo already has the floating spheres baked into one flattened
          image (unlike Black/Blue's separate layers), so it's a single element here. */}
      <div className={styles.headphone} aria-hidden="true">
        <Image src="/product-green/product-headphone.png" alt="SONIC wireless headphones" fill sizes="45vw" priority />
      </div>

      {/* ---- UI chrome (nav/logo/shop-pill live once in the shared, fixed SiteHeader) ---- */}
      <div className={styles.leftColumn}>
        <h1 className={styles.headline}>
          <span className={styles.dark}>BLOCK</span>
          <span className={styles.dark}>THE NOISE</span>
          <span className={styles.accent}>OWN YOUR</span>
          <span className={styles.accent}>WORLD</span>
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

      {/* Decorative only — no href/onClick, since ProductTransition owns scrolling between variants. */}
      <div className={styles.scrollUp} aria-hidden="true">
        <span className={styles.scrollArrowUp}>&rarr;</span>
      </div>
      <div className={styles.scrollDown} aria-hidden="true">
        <span className={styles.scrollArrowDown}>&rarr;</span>
      </div>

      <div className={styles.followRow}>
        <span className={styles.followText}>Follow Us</span>
        <div className={styles.socialIcons}>
          {SOCIAL_LINKS.map((social) => (
            <div key={social.name} className={styles.socialIcon} aria-hidden="true">
              <Image src={social.src} alt="" width={24} height={24} className={styles.socialIconGlyph} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
