import { FC } from "react";
import styles from "./avatar.module.css";

type AvatarProps = {
	alt?: string
	imageUrl: string;
	onClick?: () => void;
	className?: string;
}

const Avatar: FC<AvatarProps> = ({ imageUrl, onClick, className = "" , alt="Avatar" }) => {
	return (
		<div className={styles.avatarWrapper} onClick={onClick}>
			<img className={`${styles.avatarImage} ${className || ""}`} src={imageUrl} alt={alt} />
		</div>
	);
};

export default Avatar;
