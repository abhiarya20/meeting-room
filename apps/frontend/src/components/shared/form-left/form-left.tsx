import { FC, ReactNode } from "react";

import styles from "./form-left.module.css";

type FormLeftProps = {
	title: string;
	description: string | ReactNode;
	subTitle?: string;
	children?: ReactNode;
};

const FormLeft: FC<FormLeftProps> = ({ children, title, description, subTitle }) => {
	return (
		<div className={styles.signInSection}>
			<div className={styles.signInTitlesWrapper}>
				<span className={styles.signInTitle}>{title}</span>
				{subTitle && <span className={styles.signInSubTitle}>{subTitle}</span>}
			</div>
			<p className={styles.signInDescription}>{description}</p>
			{children}
		</div>
	);
};

export default FormLeft;
