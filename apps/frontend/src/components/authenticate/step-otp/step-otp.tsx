import FormLeft from "../../shared/form-left/form-left";
import FormRight from "../../shared/form-right/form-right";
import FormWrapper from "../../shared/form-wrapper/form-wrapper";
import ResendOtp from "./resend-otp/resend-otp";
import useOTPStep from "../../../hooks/auth-hooks/useOTPStep";
import useRedux from "../../../hooks/useRedux";

const StepOTP = () => {
	const { useTypedSelector } = useRedux();
	const { email } = useTypedSelector((state) => state.auth.otp);

	const { otp, setOtp, error, isLoading, update, handleEnterClickEvent } = useOTPStep();

	return (
		<FormWrapper isLoading={isLoading}>
			<FormLeft title='Check Your Email' subTitle={email} description="An OTP has been sent to your email. Please check your inbox, and if you don't see it, Don’t forget to check your spam folder" />
			<FormRight inputPlaceholder='000000' inputValue={otp} setInputValue={setOtp} error={error} isLoading={isLoading} update={update} handleEnterClickEvent={handleEnterClickEvent}>
				<ResendOtp />
			</FormRight>
		</FormWrapper>
	);
};

export default StepOTP;
