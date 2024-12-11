import CustomError from "../../utils/custom-error";
import { sendOtp } from "../../http";
import { setOtp } from "../../store/auth-slice";
import useRedux from "../useRedux";
import { useUpdate } from "../useUpdate";
import { validate } from "email-validator";

// Type definition for the callback function
type onNextFunction = () => void;

const useResendOTP = (onNext: onNextFunction) => {
	const { useTypedDispatch, useTypedSelector } = useRedux();
	const dispatch = useTypedDispatch();
	const { email } = useTypedSelector((state) => state.auth.otp);

	// Function to submit the OTP request
	const submit = async () => {
		const response = await sendOtp({ email: email.trim().toLowerCase() });
		return response.data; // Return the response data from the OTP request
	};

	// Success handler after OTP submission
	const onSuccess = (data: { email: string; hash: string }) => {
		dispatch(setOtp({ email: data.email, hash: data.hash })); // Store OTP data in Redux state
		onNext(); // Proceed to the next step
	};

	// Email validation function
	const validateFunc = () => {
		if (!email) return false; // Check if email exists
		if (!validate(email)) {
			// If invalid, throw a custom error
			throw new CustomError({
				message: "Invalid Email Address",
				description: "Please check your email and try again.",
			});
		}
		return true; // Return true if email is valid
	};

	// Use custom hook for managing the update, loading, and error states
	const { error, isLoading, update } = useUpdate(submit, { validateFunc, onSuccess });

	// Return necessary values for UI interaction
	return { error, isLoading, update };
};

export default useResendOTP;
