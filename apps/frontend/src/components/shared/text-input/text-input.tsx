import React, { FC } from "react";

import styles from "./text-input.module.css";

type TextInputProps = {
	label?: string;
	labelClass?: string;
	maxLength?: number;
	maxLengthClass?: string;
	type?: string;
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: FC<TextInputProps> = ({ label, labelClass, maxLength, maxLengthClass, value, onChange, className, type = "text", placeholder, ...props }) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (maxLength && value.length > maxLength) return;
		if (onChange) onChange(event);
	};

	return (
		<div className={styles.inputWrapper}>
			{label && <span className={`${styles.label} ${labelClass}`}>{label}</span>}
			<input className={`${styles.input} ${className}`} type={type} placeholder={placeholder} value={value} onChange={handleInputChange} {...props} />
			{maxLength && (
				<span className={`${styles.maxLength} ${maxLengthClass}`}>
					{value?.length || 0}/{maxLength}
				</span>
			)}
		</div>
	);
};

export default TextInput;
