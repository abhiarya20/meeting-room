import axios, { AxiosResponse } from "axios";

export const apiURL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: apiURL,
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});
// List of all the endpoints
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRoom = (data) => api.post("/api/rooms", data);
export const getAllRooms = () => api.get("/api/rooms");
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);

// Interceptors
const onFullFill = (config: AxiosResponse) => {
	return config;
};
const onError = async (error) => {
	const originalRequest = error.config;
	if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
		originalRequest.isRetry = true;
		try {
			await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
				withCredentials: true,
			});
			return api.request(originalRequest);
		} catch (err) {
			console.log(err);
		}
	}
	throw error;
};
const onRequest = (config) => {
	if (config.data instanceof FormData) {
		config.headers["Content-Type"] = "multipart/form-data";
	} else {
		config.headers["Content-Type"] = "application/json";
	}
	return config;
};

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onFullFill, onError);
export default api;
