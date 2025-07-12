import { createSlice } from "@reduxjs/toolkit";

const authInitVal = { email: "", name: "", uid: "" };
const authReducer = createSlice({
  name: "authReducer",
  initialState: authInitVal,
  reducers: {
    setAuthState: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
  },
});

export default authReducer.reducer;
export const { setAuthState } = authReducer.actions;
