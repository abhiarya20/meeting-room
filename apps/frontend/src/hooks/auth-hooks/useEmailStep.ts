import { KeyboardEventHandler, useState } from "react";

import CustomError from "../../utils/custom-error";
import { sendOtp } from "../../http";
import { setOtp } from "../../store/auth-slice";
import useRedux from "../useRedux";
import { useUpdate } from "../useUpdate";
import { validate } from "email-validator";

type onNextFunction = () => void;

const useEmailStep = (onNext: onNextFunction) => {
	const [email, setEmail] = useState("");
	const { useTypedDispatch } = useRedux();
	const dispatch = useTypedDispatch();

	// Submit the form to send OTP
	const submit = async () => {
		const response = await sendOtp({ email: email.trim().toLowerCase() });
		return response.data;
	};

	// Handle success after OTP submission
	const onSuccess = (data: { email: string; hash: string }) => {
		dispatch(setOtp({ email: data.email, hash: data.hash }));
		onNext(); // Proceed to the next step
	};

	// Email validation function
	const validateFunc = () => {
		if (!email) return false; // Empty email check
		if (!validate(email)) {
			// Throw error if the email is invalid
			throw new CustomError({
				message: "Invalid Email Address",
				description: "Please check your email and try again.",
			});
		}
		return true;
	};

	// Handle form update, error, and loading states with useUpdate
	const { error, isLoading, update } = useUpdate(submit, { validateFunc, onSuccess });

	// Handle 'Enter' key press to trigger form submission
	const handleEnterClickEvent: KeyboardEventHandler<HTMLFormElement> = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			update(); // Trigger the form update
		}
	};
	

	return {
		email,
		setEmail,
		error,
		isLoading,
		update,
		handleEnterClickEvent,
	};
};

export default useEmailStep;
