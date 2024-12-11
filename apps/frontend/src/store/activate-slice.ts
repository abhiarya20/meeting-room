import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ActivateState = {
	name: string;
	avatar: string;
};

const initialState: ActivateState = {
	name: "",
	avatar: "",
};

export const activateSlice = createSlice({
	name: "activate",
	initialState,
	reducers: {
		setName: (state, action:PayloadAction<string>) => {
			state.name = action.payload;
		},
		setAvatar: (state, action:PayloadAction<string>) => {
			state.avatar = action.payload;
		},
	},
});

export const { setName, setAvatar } = activateSlice.actions;
export default activateSlice.reducer;
