import { DependencyList, useEffect, useState } from "react";

import { AxiosError } from "axios";
import CustomError from "../utils/custom-error";

type CallbackType<T> = () => Promise<T>;

export function useFetch<T>(callback: CallbackType<T>, dependencies: DependencyList) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<CustomError | null>(null);

	useEffect(() => {
		(async () => {
			setError(null);
			setIsLoading(true);
			try {
				const data = await callback();
				setData(data);
			} catch (err) {
				if (err instanceof AxiosError) {
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
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return { isLoading, data, error };
}

