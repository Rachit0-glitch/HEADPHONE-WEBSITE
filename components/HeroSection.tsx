import Image from "next/image";
import styles from "./HeroSection.module.css";

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

      {/* Mobile/tablet-only art layer: a dedicated portrait (941x1672) background shot, not a crop of
          the desktop 16:9 photo — cover-cropping that wide photo to fill a portrait screen required
          zooming in so far the headphone rendered wider than the screen itself. This background was
          composed portrait from the start, so headphone + arch sit on top of it uncropped, positioned
          over the shadow already baked into the shot. See the media query in the CSS for why this and
          `.artLayer` are simply swapped by breakpoint rather than one layer serving both. */}
      <div className={styles.mobileArtLayer} aria-hidden="true">
        <Image src="/hero/background-mobile.png" alt="" fill priority className={styles.mobileBg} sizes="100vw" />
        <Image
          src="/hero/soundwave-left.png"
          alt=""
          width={457}
          height={395}
          priority
          className={`${styles.mobileLayer} ${styles.mobileWaveLeft}`}
        />
        <Image
          src="/hero/arch.png"
          alt=""
          width={545}
          height={707}
          priority
          className={`${styles.mobileLayer} ${styles.mobileArch}`}
        />
        <Image
          src="/hero/soundwave-right.png"
          alt=""
          width={442}
          height={366}
          priority
          className={`${styles.mobileLayer} ${styles.mobileWaveRight}`}
        />
        <Image
          src="/hero/headphone.png"
          alt=""
          width={500}
          height={671}
          priority
          className={`${styles.mobileLayer} ${styles.mobileHeadphone}`}
        />
      </div>

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
