import { FC, ReactNode } from "react";

import styles from "./description.module.css";

type DescriptionProps = {
	description: string | ReactNode;
};

const Description: FC<DescriptionProps> = () => (
	<div className={styles.descriptionWrapper}>
		<p className={styles.description}>Seamlessly connect with high-quality video, real-time chat, and easy presentation tools anytime, anywhere. Transform your teamwork and drive projects forward effortlessly!</p>
	</div>
);

export default Description;
