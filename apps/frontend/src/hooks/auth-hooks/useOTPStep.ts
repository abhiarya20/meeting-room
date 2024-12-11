import { KeyboardEventHandler, useState } from "react";

import CustomError from "../../utils/custom-error";
import { setAuth } from "../../store/auth-slice";
import useRedux from "../useRedux";
import { useUpdate } from "../useUpdate";
import { verifyOtp } from "../../http";

const useOTPStep = () => {
	const [otp, setOtp] = useState("");
	const { useTypedDispatch, useTypedSelector } = useRedux();
	const dispatch = useTypedDispatch();
	const { hash, email } = useTypedSelector((state) => state.auth.otp);

	// Submit the form to send OTP
	const submit = async () => {
		const response = await verifyOtp({ email, otp, hash });
		return response.data;
	};

	// Handle success after OTP submission
	const onSuccess = (data) => {
		dispatch(setAuth(data));
	};

	// Email validation function
	const validateFunc = () => {
		if (!otp) return false;
		if (otp.length === 6) return true;
		throw new CustomError({ message: "Looks like the OTP is incorrect.", description: "Please check your email for correct OTP" });
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

	// Return hook values
	return {
		otp,
		setOtp,
		error,
		isLoading,
		update,
		handleEnterClickEvent,
	};
};

export default useOTPStep;
