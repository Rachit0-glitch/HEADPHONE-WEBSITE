import Image from "next/image";
import styles from "./HeroSection.module.css";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PRODUCTS", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "JOURNAL", href: "#" },
  { label: "CONTACT", href: "#" },
];

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
      <a href="/" className={`${styles.logo} ${styles.fadeInDown}`}>
        SONIC&deg;
      </a>

      <nav className={`${styles.nav} ${styles.fadeInDown}`} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#" className={`${styles.shopPill} ${styles.fadeInDown}`}>
        <span>SHOP NOW</span>
        <span className={styles.shopArrow} aria-hidden="true">
          &rarr;
        </span>
      </a>

      {/* Headline + divider + subtext grouped into one flex column, vertically centered as a unit —
          spacing between them always follows the headline's REAL rendered height, so they can never
          overlap no matter how large the responsive font-size gets. */}
      <div className={styles.leftColumn}>
        <h1 className={styles.headline}>
          <span className={`${styles.dark} ${styles.fadeInUp}`}>BLOCK</span>
          <span className={`${styles.dark} ${styles.fadeInUp}`}>THE NOISE</span>
          <span className={`${styles.teal} ${styles.fadeInUp}`}>OWN YOUR</span>
          <span className={`${styles.teal} ${styles.fadeInUp}`}>WORLD</span>
        </h1>

        <div className={`${styles.divider} ${styles.fadeInUp}`} />

        <p className={`${styles.subtext} ${styles.fadeInUp}`}>
          Premium Wireless
          <br />
          Headphones
        </p>
      </div>

      <a href="#" className={`${styles.discover} ${styles.fadeInUp}`}>
        <span className={styles.discoverText}>DISCOVER MORE</span>
        <span className={styles.discoverCircle} aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  );
}
