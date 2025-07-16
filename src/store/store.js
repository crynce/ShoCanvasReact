import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";
import authReducer from "./authReducer";
import uploadReducer from "./uploadReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
    authUserData: authReducer,
    uploadsData: uploadReducer,
  },
});
export default store;
