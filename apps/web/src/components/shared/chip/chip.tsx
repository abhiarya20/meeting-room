import { FC, MouseEventHandler, ReactNode } from "react";

import styles from "./chip.module.css"; // Change file name to match new camelCase convention

type ChipProps = {
	label: string;
	icon: ReactNode;
	className?: string;
	labelClassName?: string;
	iconClassName?: string;
	onClick?: MouseEventHandler<HTMLSpanElement>;
	onMouseEnter?: MouseEventHandler<HTMLSpanElement>;
};

const Chip: FC<ChipProps> = ({ label, icon, className, labelClassName, iconClassName, onMouseEnter, onClick }) => {
	return (
		<span className={`${styles.heroChip} ${className}`} onMouseEnter={onMouseEnter} onClick={onClick}>
			<span className={labelClassName}>{label}</span>
			<span className={`${styles.heroChipIcon} ${iconClassName}`}>{icon}</span>
		</span>
	);
};

export default Chip;
