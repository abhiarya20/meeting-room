import Chip from "../../../shared/chip/chip";
import { changeHeroSectionIndex } from "../../../../store/hero-section-slice";
import { chips } from "../data/chips";
import styles from "./hero-message.module.css";
import useRedux from "../../../../hooks/useRedux";

const HeroMessage = () => {
	const { useTypedDispatch, useTypedSelector } = useRedux();
	const { activeIndex } = useTypedSelector((state) => state.heroSection);
	const dispatch = useTypedDispatch();

	return (
		<p className={styles.heroMessage}>
			<img src='/assets/npm.png' alt='logo' className={styles.npmImage} />
			<span>Connect and Collaborate</span>
			<span>Seamlessly with</span>
			<span className={styles.chipsWrapper}>
				{chips.map((chip, index) => (
					<span key={chip.label}>
						{index === chips.length - 1 && <span className={styles.chipAnd}>&</span>}
						<Chip label={chip.label} icon={chip.icon} className={`${activeIndex === index && styles.chipHover}`} onMouseEnter={() => dispatch(changeHeroSectionIndex(index))} />
					</span>
				))}
			</span>
			<span>Anytime, Anywhere!</span>
		</p>
	);
};
export default HeroMessage;
