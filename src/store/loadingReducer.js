import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message || "";
    },
    startLoading: (state, action) => {
      state.isLoading = true;
      state.message = action.payload || "";
    },
    stopLoading: (state) => {
      state.isLoading = false;
      state.message = "";
    },
  },
});

export const { setLoading, startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
