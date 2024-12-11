import { FC } from "react";
import styles from "./form-error.module.css";

type FormErrorProps = {
	message: string;
	description?: string;
}

const FormError: FC<FormErrorProps> = ({ message, description }) => {
	return (
		<div className={styles.errorContainer}>
			{<p className={styles.errorMessage}>{message}</p>}
			{description && <p className={styles.errorDescription}>{description}</p>}
		</div>
	);
};

export default FormError;
