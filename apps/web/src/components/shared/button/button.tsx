import React, { FC } from "react";

import { BeatLoader } from "react-spinners";
import styles from "./button.module.css";

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	isLoading?: boolean;
	className?: string;
	loaderColor?: string;
};

const Button: FC<ButtonProps> = ({ children, onClick, isLoading = false, className = "", loaderColor = "var(--text-color-dark)" }) => {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (onClick) onClick();
			}}
			className={`${styles.button} ${className}`}
			disabled={isLoading} // Optionally disable the button when loading
		>
			{isLoading ?
				<div className={styles.loaderWrapper}>
					<BeatLoader color={loaderColor} />
				</div>
			:	<>{children}</>}
		</button>
	);
};

export default Button;
