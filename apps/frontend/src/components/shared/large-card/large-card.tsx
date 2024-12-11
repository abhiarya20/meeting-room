import React, { FC } from "react";

import Logo from "../logo/logo";
import styles from "./large-card.module.css";

type LargeCardProps = {
	withLogo?: boolean;
	isLoading?: boolean;
	children?: React.ReactNode | null;
};

const LargeCard: FC<LargeCardProps> = ({ withLogo = true,isLoading , children }) => {
	return (
		<div className={styles.cardWrapper}>
			{isLoading && <div className={styles.progressBarWrapper}></div>}
			<div className={styles.cardContent}>
				{withLogo && (
					<div className={styles.logoWrapper}>
						<Logo />
					</div>
				)}
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default LargeCard;
