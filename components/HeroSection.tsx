import Image from "next/image";
import styles from "./HeroSection.module.css";

const NAV_LINKS = ["HOME", "PRODUCTS", "ABOUT", "JOURNAL", "CONTACT"];

export default function HeroSection() {
  return (
    <div className={styles.wrap}>
      {/* ---- Art layer: background + waves + arch + headphones. This is the only thing allowed to
          crop on unusual aspect ratios (cover-scaled, like a normal hero photo) — see the CSS comment. */}
      <div className={styles.artLayer} aria-hidden="true">
        <Image src="/hero/background.png" alt="" fill priority className={styles.bg} sizes="100vw" />
        <Image
          src="/hero/soundwave-left.png"
          alt=""
          width={457}
          height={395}
          priority
          className={`${styles.layer} ${styles.waveLeft}`}
        />
        <Image
          src="/hero/arch.png"
          alt=""
          width={545}
          height={707}
          priority
          className={`${styles.layer} ${styles.arch}`}
        />
        <Image
          src="/hero/soundwave-right.png"
          alt=""
          width={442}
          height={366}
          priority
          className={`${styles.layer} ${styles.waveRight}`}
        />
        <Image
          src="/hero/headphone.png"
          alt=""
          width={500}
          height={671}
          priority
          className={`${styles.layer} ${styles.headphone}`}
        />
      </div>

      {/* ---- UI chrome: pinned to the real viewport edges, never cropped, regardless of screen ratio ---- */}
      <div className={styles.logo}>SONIC&deg;</div>

      <nav className={styles.nav} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link} href="#" className={link === "HOME" ? styles.navLinkActive : styles.navLink}>
            {link}
          </a>
        ))}
      </nav>

      <a href="#" className={styles.shopPill}>
        <span>SHOP NOW</span>
        <span className={styles.shopArrow} aria-hidden="true">
          &rarr;
        </span>
      </a>

      <h1 className={styles.headline}>
        <span className={styles.dark}>BLOCK</span>
        <span className={styles.dark}>THE NOISE</span>
        <span className={styles.teal}>OWN YOUR</span>
        <span className={styles.teal}>WORLD</span>
      </h1>

      <div className={styles.divider} />

      <p className={styles.subtext}>
        Premium Wireless
        <br />
        Headphones
      </p>

      <a href="#" className={styles.discover}>
        <span className={styles.discoverText}>DISCOVER MORE</span>
        <span className={styles.discoverCircle} aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}
