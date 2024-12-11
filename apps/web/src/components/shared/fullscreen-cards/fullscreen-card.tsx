import React, { FC } from "react";

import LargeCard from "../large-card/large-card";
import Navbar from "../navbar/navbar";
import styles from "./fullscreen-card.module.css";

type FullScreenCardProps = {
	isLoading?: boolean;
	withNavbar?: boolean;
	withLogo?: boolean;
	withLoginButton?: boolean;
	children?: React.ReactNode | null;
};

const FullScreenCard: FC<FullScreenCardProps> = ({ isLoading, withNavbar = true, withLogo = true, withLoginButton = false, children }) => {
	return (
		<div className={styles.fullScreenWrapper}>
			{withNavbar && <Navbar withLoginButton={withLoginButton} />}
			<div className={styles.screenWrapper}>
				<LargeCard isLoading={isLoading} withLogo={withLogo}>{children}</LargeCard>
			</div>
		</div>
	);
};

export default FullScreenCard;
