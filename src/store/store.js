import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
  },
});
export default store;
