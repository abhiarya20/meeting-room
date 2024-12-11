import Logo from "../../shared/logo/logo";
import styles from "./form-logo.module.css";

const FormLogo = () => {
	return (
		<div className={styles.logoContainer}>
			<img src={`/assets/logo.svg`} alt='logo' className={styles.logo} />
			<div className={styles.logoWrapper}>
				<Logo />
			</div>
		</div>
	);
};

export default FormLogo;
