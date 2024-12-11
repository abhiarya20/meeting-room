// src/components/PaginationDots/PaginationDots.tsx

import styles from "./pagination-dots.module.css";

type PaginationDotsProps = {
	count: number;
	activeIndex: number;
	onClick: (index: number) => void;
	paginationClassName?: string;
	dotClassName?: string;
	activeDotClassName?: string;
};

const PaginationDots = ({ count, activeIndex, onClick, paginationClassName = "", dotClassName = "", activeDotClassName = "" }: PaginationDotsProps) => {
	return (
		<div className={`${styles.pagination} ${paginationClassName}`}>
			{Array.from({ length: count }, (_, index) => (
				<span
					key={index}
					className={`${styles.paginationDot} ${dotClassName} ${activeIndex === index ? `${styles.paginationActive} ${activeDotClassName}` : ""}`} // Conditional active class with custom classes
					onClick={() => onClick(index)} // Navigate to the slide on click
				/>
			))}
		</div>
	);
};

export default PaginationDots;
