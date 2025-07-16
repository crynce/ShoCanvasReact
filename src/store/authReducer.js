import { createSlice } from "@reduxjs/toolkit";
import { logInUserHandler } from "./signupReducer";
import { pushLinkToFirebase } from "./uploadReducer";

const authInitVal = { email: "", name: "", uid: "", allUploadsURL: [] };
const authReducer = createSlice({
  name: "authReducer",
  initialState: authInitVal,
  reducers: {
    setAuthState: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = "authSliceState";
      state.allUploadsURL = action.payload.allUploadsURL;
    },
    clearAuthState: (state) => {
      state = authInitVal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUserHandler.fulfilled, (state, action) => {
      //   state.email = action.payload.email;
      //   state.uid = action.payload.uid;
      //   state.name = action.payload.name;
      //   state.allUploadsURL = action.payload.allUploadsURL;
      console.log(state, action.payload, "printed in auth reducer fulfilled");
    });
    builder.addCase(logInUserHandler.pending, (state, action) => {
      console.log(state, "state", "printed in auth reducer");
    });
    builder.addCase(logInUserHandler.rejected, (state, action) => {
      console.log(
        state.email,
        action.payload,
        "state",
        "printed in auth reducer"
      );
    });
    builder.addCase(pushLinkToFirebase.fulfilled, (state, action) => {
      state.allUploadsURL = action.payload.allUploadsURL;
      console.log(state, "authSlice");
    });
  },
});

export default authReducer.reducer;
export const { setAuthState, clearAuthState } = authReducer.actions;
