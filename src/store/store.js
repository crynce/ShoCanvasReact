import { configureStore } from "@reduxjs/toolkit";
import signupFormReducer from "./signupReducer";
import loadingReducer from "./loadingReducer";
import uploadReducer from "./uploadReducer";

const store = configureStore({
  reducer: {
    signupFormData: signupFormReducer,
    loading: loadingReducer,
    uploadData: uploadReducer,
  },
});
export default store;
