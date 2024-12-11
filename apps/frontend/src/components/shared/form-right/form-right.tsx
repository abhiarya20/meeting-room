import { FC, ReactNode } from "react";

import Button from "../button/button";
import CustomError from "../../../utils/custom-error";
import FormError from "../form-error/form-error";
import SocialAuthButton from "../social-auth-button/social-auth-button";
import TextInput from "../text-input/text-input";
import { TiArrowRight } from "react-icons/ti";
import styles from "./form-right.module.css";

type FormRightProps = {
	withSocialAuthButton?: boolean;
	inputValue: string;
	setInputValue: (value: string) => void;
	inputPlaceholder?: string;
	error: CustomError | null;
	isLoading: boolean;
	update: () => void;
	handleEnterClickEvent: (e: React.KeyboardEvent<HTMLFormElement>) => void;
	children?: ReactNode;
};

const FormRight: FC<FormRightProps> = ({ children, withSocialAuthButton = true, inputValue, setInputValue, inputPlaceholder, error, isLoading, update, handleEnterClickEvent }) => {
	return (
		<form className={styles.formContainer} onKeyDown={handleEnterClickEvent}>
			<div className={styles.inputErrorWrapper}>
				{<FormError message={error?.message ?? ""} description={error?.description} />}
				<TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={inputPlaceholder} />
				{children}
			</div>
			<div className={styles.buttonWrapper}>
				{withSocialAuthButton && <SocialAuthButton />}
				<Button onClick={update} isLoading={isLoading} loaderColor='white'>
					<span>Next</span>
					<TiArrowRight className={styles.authIcon} />
				</Button>
			</div>
		</form>
	);
};

export default FormRight;
