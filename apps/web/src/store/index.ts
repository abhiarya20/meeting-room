import activate from "./activate-slice";
import auth from "./auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import heroSection from "./hero-section-slice";

export const store = configureStore({
  reducer: {
    auth,
    activate,
    heroSection,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>