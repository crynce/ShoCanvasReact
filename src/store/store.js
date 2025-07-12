import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
    authUserData: authReducer,
  },
});
export default store;
