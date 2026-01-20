import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";
import loadingReducer from "./loadingReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
    loading: loadingReducer,
  },
});
export default store;
