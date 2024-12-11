import Button from "../../../shared/button/button";
import { FaArrowRight } from "react-icons/fa6";
import { ReactNode } from "react";
import styles from "./industry-card.module.css";
import { useNavigate } from "react-router-dom";

type IndustryCardType = {
	title: string;
	description: string;
	icon: ReactNode;
	background: string;
    btnText: string;
};

function IndustryCard({ btnText,title, description, icon, background }: IndustryCardType) {
	const navigate = useNavigate();
	return (
		<div className={styles.industriesCardsWrapper}>
			<div style={{ background: background }} className={styles.industriesCard}>
				<div className={styles.industriesCardHeader}>
					<span className={styles.industriesCardIcon}>{icon}</span>
					<h1 className={styles.industriesCardTitle}>{title}</h1>
				</div>
				<div className={styles.industriesCardContent}>
					<div className={styles.industriesCardTextWrapper}>
						<p className={styles.industriesCardText}>{description}</p>
						<div className={styles.industriesCardBtnWrapper}>
							<Button onClick={() => navigate("/authenticate")}>
								<span>{btnText}</span>
								<FaArrowRight className={styles.industriesCardButtonIcon} />
							</Button>
						</div>
					</div>
					<span className={styles.industriesCardIcon}>{icon}</span>
				</div>
			</div>
		</div>
	);
}

export default IndustryCard;
