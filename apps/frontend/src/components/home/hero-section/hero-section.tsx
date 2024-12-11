import { HeroBackground } from "../../shared/hero-background/hero-background";
import HeroCardLeft from "./hero-card-left/hero-card-left";
import HeroCardRight from "./hero-card-right/hero-card-right";
import styles from "./hero-section.module.css";

const HeroSection = () => {
	return (
		<section className={styles.heroSection}>
			<HeroBackground />
			<div className={styles.heroContentWrapper}>
				<div className={styles.heroCard}>
					<HeroCardLeft />
					<HeroCardRight />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
