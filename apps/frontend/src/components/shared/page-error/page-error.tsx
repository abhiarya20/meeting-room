import { FC, ReactElement } from "react";

import Button from "../button/button";
import CustomError from "../../../utils/custom-error";
import FullScreenCard from "../fullscreen-cards/fullscreen-card";
import styles from "./page-error.module.css";

type PageErrorProps = {
	icon?: ReactElement;
	error: CustomError;
	buttonTxt?: string;
	buttonIcon?: ReactElement;
	onButtonClick?: () => void;
};

const PageError: FC<PageErrorProps> = ({ icon, error, buttonTxt, buttonIcon, onButtonClick }) => {
	return (
		<FullScreenCard>
			<div className={styles.errorDetails}>
				{icon && <div className={styles.errorIcon}>{icon}</div>}
				{<span className={styles.errorMessage}>{error.message}</span>}
				{error.description && (
					<div className={styles.descriptionContainer}>
						<p className={styles.errorDescription}>{error.description}</p>
					</div>
				)}
			</div>
			{(buttonTxt || buttonIcon) && (
				<div className={styles.buttonWrapper}>
					<Button onClick={onButtonClick}>
						{buttonTxt && <span>{buttonTxt}</span>}
						{buttonIcon}
					</Button>
				</div>
			)}
		</FullScreenCard>
	);
};

export default PageError;
