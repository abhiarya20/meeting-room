import { useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";
import styles from "./resend-otp.module.css";
import useResendOTP from "../../../../hooks/auth-hooks/useResendOTP";

const ResendOtp = () => {
	const [timer, setTimer] = useState(30);

	useEffect(() => {
		const interval = setTimeout(() => {
			console.log(timer);
			if (timer <= 0) return;
			setTimer(timer - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timer]);

	const { error, isLoading, update } = useResendOTP(() => setTimer(30));

	return (
		<div className={styles.resetClockWrapper}>
			{isLoading ?
				<BeatLoader color='var(--primary-color-dark)' />
			: timer ?
				<p>{`Resend OTP in ${timer}s`}</p>
			:	<p className={styles.resetBtn} onClick={update}>
					{error && <span className={styles.errorDescription}>{error.description}</span>} Resend OTP
				</p>
			}
		</div>
	);
};

export default ResendOtp;
