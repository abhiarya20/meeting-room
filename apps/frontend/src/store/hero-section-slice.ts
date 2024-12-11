import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ActivateState = {
  activeIndex: number;
}

const initialState:ActivateState = {
    activeIndex: 0
};

export const heroSectionSlice = createSlice({
  name: "hero-section-slice",
  initialState,
  reducers: {
    changeHeroSectionIndex: (state, action:PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { changeHeroSectionIndex } = heroSectionSlice.actions;
export default heroSectionSlice.reducer;