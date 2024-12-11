import { FC, ReactNode } from "react";

import FormLogo from "../form-logo/form-logo";
import FullScreenCard from "../fullscreen-cards/fullscreen-card";
import styles from "./form-wrapper.module.css";

type FormWrapperProps = {
	isLoading: boolean;
	children: ReactNode;
};

const FormWrapper: FC<FormWrapperProps> = ({ children, isLoading }) => {
	return (
		<FullScreenCard isLoading={isLoading} withLogo={false}>
			<div className={styles.contentWrapper}>
				<FormLogo />
				<div className={styles.signInSectionWrapper}>{children}</div>
			</div>
		</FullScreenCard>
	);
};

export default FormWrapper;
