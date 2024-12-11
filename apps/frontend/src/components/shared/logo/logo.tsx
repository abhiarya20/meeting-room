import styles from "./logo.module.css";

type LogoProps = {
	onClick?: () => void;
};

export default function Logo({ onClick }: LogoProps) {
	return (
		<div className={styles.logoWrapper} onClick={onClick}>
			<img src={`/assets/logo.svg`} alt='logo' className={styles.logoImage} />
			<h1 className={styles.logoTitle}>Meeting Room</h1>
		</div>
	);
}
