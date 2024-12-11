import styles from "./hero-background.module.css";

function HeroBackground() {
  return (
    <div className={styles.heroBackgroundContainer}>
      <div className={`${styles.heroBackgroundColor} ${styles.primaryHeroBackgroundColor}`}></div>
      <div className={`${styles.heroBackgroundColor} ${styles.secondaryHeroBackgroundColor}`}></div>
      <div className={`${styles.heroBackgroundColor} ${styles.tertiaryHeroBackgroundColor}`}></div>
    </div>
  );
}

export { HeroBackground };
