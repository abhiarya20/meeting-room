import { FC, ReactNode } from "react";

import FullScreenCard from "../fullscreen-cards/fullscreen-card";
import { HashLoader } from "react-spinners";
import styles from "./page-loader.module.css";

type LoadingProps = {
	isLoading?: boolean;
	message?: string;
};

const PageLoader: FC<LoadingProps> = ({ message, isLoading }) => {
	return (
		<FullScreenCard isLoading={isLoading}>
			<div className={styles.loaderWrapper}>
				<HashLoader color='#DB4437' />
				{message && <span className={styles.message}>{message}</span>}
			</div>
		</FullScreenCard>
	);
};

export default PageLoader;
