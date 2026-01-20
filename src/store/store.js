import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
    loading: loadingReducer,
    authUserData: authReducer,
  },
});
export default store;
