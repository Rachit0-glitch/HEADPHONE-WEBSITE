import Image from "next/image";
import styles from "./ProductSectionBlue.module.css";

const SOCIAL_LINKS = [
  { name: "Facebook", src: "/product-blue/social-facebook.png" },
  { name: "Instagram", src: "/product-blue/social-instagram.png" },
  { name: "Twitter", src: "/product-blue/social-twitter.png" },
  { name: "YouTube", src: "/product-blue/social-youtube.png" },
];

// Always index 0 (the default/first-shown state) in the Blue->Black->Green sequence — its CSS reads
// --entrance-0/--exit-0 directly, no role prop needed.
export default function ProductSectionBlue() {
  return (
    <div className={styles.wrap}>
      {/* Same 1672x941 layout/positions as ProductSectionBlack (kept in sync in Figma), just the
          Blue color variant — see ProductSectionBlue.module.css for details. */}
      <div className={styles.sphereGrey} aria-hidden="true">
        <Image src="/product-blue/sphere-grey.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereLeftMed} aria-hidden="true">
        <Image src="/product-blue/sphere-left-med.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereLeftSmall} aria-hidden="true">
        <Image src="/product-blue/sphere-left-small.png" alt="" fill sizes="4vw" />
      </div>

      <div className={styles.headphone} aria-hidden="true">
        <Image src="/product-blue/product-headphone.png" alt="SONIC wireless headphones" fill sizes="30vw" priority />
      </div>

      <div className={styles.sphereTopRight} aria-hidden="true">
        <Image src="/product-blue/sphere-top-right.png" alt="" fill sizes="10vw" />
      </div>
      <div className={styles.sphereMidRight} aria-hidden="true">
        <Image src="/product-blue/sphere-mid-right.png" alt="" fill sizes="5vw" />
      </div>
      <div className={styles.sphereTinyRight} aria-hidden="true">
        <Image src="/product-blue/sphere-tiny-right.png" alt="" fill sizes="3vw" />
      </div>
      <div className={styles.sphereBottomRight} aria-hidden="true">
        <Image src="/product-blue/sphere-bottom-right.png" alt="" fill sizes="8vw" />
      </div>
      <div className={styles.sphereBottomCenter} aria-hidden="true">
        <Image src="/product-blue/sphere-bottom-center.png" alt="" fill sizes="4vw" />
      </div>

      {/* ---- UI chrome (nav/logo/shop-pill live once in the shared, fixed SiteHeader) ---- */}
      <div className={styles.leftColumn}>
        <h1 className={styles.headline}>
          <span className={styles.bright}>THE COLOR</span>
          <span className={styles.bright}>OF CALM</span>
          <span className={styles.accent}>THE DEPTH </span>
          <span className={styles.accent}>OF SOUND</span>
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
