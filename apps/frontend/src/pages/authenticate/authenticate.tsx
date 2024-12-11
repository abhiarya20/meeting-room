import { FC, useState } from "react";

import StepEmail from "../../components/authenticate/step-email/step-email";
import StepOtp from "../../components/authenticate/step-otp/step-otp";

type onNextFunction = () => void;

type Steps = {
	[key: number]: FC<{ onNext: onNextFunction }>;
};

const steps: Steps = {
	1: StepEmail,
	2: StepOtp,
};

const Authenticate = () => {
	const [step, setStep] = useState(1);
	const Step = steps[step];

	function onNext() {
		setStep(step + 1);
	}
	return <Step onNext={onNext} />;
};

export default Authenticate;
