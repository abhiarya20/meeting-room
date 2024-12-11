import  { FC, useRef } from "react";

import styles from "./copywright-footer.module.css";

const CopyrightFooter: FC = () => {
	const footerRef = useRef<HTMLDivElement | null>(null);
	const tooltipRef = useRef<HTMLSpanElement | null>(null);

	const handleTooltipMovement = (e: React.MouseEvent<HTMLDivElement>) => {
		const tooltip = tooltipRef.current;
		const footer = footerRef.current;

		if (tooltip && footer) {
			const xPos = e.pageX;
			const yPos = -40;
			tooltip.style.left = `${xPos}px`;
			tooltip.style.top = `${yPos}px`;
		}
	};

	const currentYear = new Date().getFullYear();

	return (
		<footer ref={footerRef} onMouseMove={handleTooltipMovement} className={styles.footer}>
			<p>{"</> and crafted with 💛 by Abhi Arya"}</p>
			<span ref={tooltipRef} className={styles.tooltip}>
				&#169; {currentYear}, Abhi Arya
			</span>
		</footer>
	);
};

export default CopyrightFooter;
