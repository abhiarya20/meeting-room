import Button from "../button/button";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { apiURL } from "../../../http";
import styles from "./social-auth-button.module.css";

const SocialAuthButton = () => {
	const googleAuth = () => {
		window.open(`${apiURL}/auth/google`, "_self");
	};
	const facebookAuth = () => {
		window.open(`${apiURL}/auth/facebook`, "_self");
	};

	return (
		<div className={styles.socialAuthWrapper}>
			<Button onClick={facebookAuth}>
				<FaFacebookF className={styles.authIcon} />
			</Button>
			<Button onClick={googleAuth} className={styles.googleButton}>
				<FcGoogle className={styles.authIcon} />
			</Button>
		</div>
	);
};

export default SocialAuthButton;
