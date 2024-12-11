import Description from "../../../shared/description/description";
import HeroButton from "../hero-button/hero-button";
import HeroMessage from "../hero-message/hero-message";
import styles from "./hero-card-left.module.css";

const HeroCardLeft = () => {
	return (
		<div className={styles.heroCardLeft}>
			<div className={styles.heroDetailsWrapper}>
				<HeroMessage />
				<Description description={"Seamlessly connect with high-quality video, real-time chat, and easy presentation tools anytime, anywhere. Transform your teamwork and drive projects forward effortlessly!"} />
				<HeroButton />
			</div>
		</div>
	);
};

export default HeroCardLeft;
