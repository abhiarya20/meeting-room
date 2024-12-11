import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

import CustomError from "../utils/custom-error";
import { setAuth } from "../store/auth-slice";
import useRedux from "./useRedux";

export function useLoadingWithRefresh() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<CustomError | null>(null);
	const { useTypedDispatch } = useRedux();
	const dispatch = useTypedDispatch();

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/refresh`, {
					withCredentials: true,
				});
				console.log(data);
				
				dispatch(setAuth(data));
			} catch (err) {
				if (err instanceof AxiosError) {
					const { response } = err;
					if (!response) {
						setError(new CustomError({ message: "Oops! No Internet!", description: "It seems you’re offline. Please check your connection and try again. I’m here when you’re back!" }));
					} else if (response.status === 500) {
						setError(new CustomError({ code: response.status, message: "Oops! Something went wrong", description: "It looks like something didn't go as planned. Please try again in a moment. We are fixing this issue very soon." }));
					}
				}
			} finally {
				setIsLoading(false);
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isLoading, error };
}
