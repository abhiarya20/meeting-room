import { AxiosError } from "axios";
import CustomError from "../utils/custom-error";
import { useState } from "react";

type CallbackType<T> = () => Promise<T>;

type OptionType<T> = {
	onSuccess?: (data: T) => void;
	onError?: (error: AxiosError) => void;
	validateFunc?: () => boolean;
};

export function useUpdate<T>(callback: CallbackType<T>, options: OptionType<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<CustomError | null>(null);

	const { onSuccess, onError, validateFunc } = options;
	const update = async () => {
		if (isLoading) return;
		setIsLoading(true);
		setError(null);
		try {
			if (validateFunc && !validateFunc()) return;
			const data = await callback();
			if (onSuccess) onSuccess(data);
			setData(data);
		} catch (err) {
			console.log(err);
			
			if (err instanceof AxiosError) {
				if (onError) onError(err);
				if (!err.response) {
					setError(new CustomError({ message: "Oops! No Internet!", description: "It seems you’re offline. Please check your connection and try again. I’m here when you’re back!" }));
				} else if (err.response.status === 500) {
					setError(new CustomError({ code: err.response.status, message: "Oops! Something went wrong", description: "It looks like something didn't go as planned. Please try again in a moment, We are fixing this issue very soon." }));
				} else if (err.response.data) {
					const { data, status } = err.response;
					setError(new CustomError({ code: status, message: data.message ?? "Unexpected error occurred", description: data.description ?? "Something went wrong. Please try again later." }));
				} else {
					setError(new CustomError({ message: "Something went wrong", description: "An unknown issue occurred. Please try again later." }));
				}
			} else if (err instanceof CustomError) {
				setError(new CustomError({ message: err.message, description: err.description }));
			} else {
				setError(new CustomError({ message: "Something went wrong", description: "An unknown issue occurred. Please try again later." }));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, data, update };
}

export default useUpdate;












