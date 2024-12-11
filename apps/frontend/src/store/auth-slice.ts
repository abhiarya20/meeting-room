import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
	activated: boolean;
	createdAt: string;
};

type AuthState = {
	isAuth: boolean;
	user: User | null;
	otp: {
		hash: string;
		email: string;
	};
};

const initialState: AuthState = {
	isAuth: false,
	user: null,
	otp: {
		hash: "",
		email: "",
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action:PayloadAction<AuthState>) => {
			const { user } = action.payload;
			state.user = user 
			state.isAuth = user !==null;
		},
		setOtp: (state, action) => {
			const { email, hash } = action.payload;
			state.otp.email = email;
			state.otp.hash = hash;
		},
	},
});

export const { setAuth, setOtp } = authSlice.actions;
export default authSlice.reducer;