import { createSlice } from "@reduxjs/toolkit";
import { logInUserHandler, addNewUser } from "./signupReducer";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../utility/fireConfig";
import { pushLinkToFirebase } from "./uploadReducer";

import { createAsyncThunk } from "@reduxjs/toolkit";
const authInitVal = { email: "", name: "", uid: "", allUploadsURL: [] };
const fetchInitialData = createAsyncThunk(
  "authReducer/fetchInitialData",
  async (uid) => {
    try {
      const docRef = doc(db, "Users", uid);
      const userDataSnapshot = await getDoc(docRef);
      let data;
      if (userDataSnapshot.exists()) {
        data = userDataSnapshot.data();
      }
      console.log(uid, data, "userDataSnapshot");
      return { data, uid };
    } catch (err) {
      console.log(err);
    }
  },
);
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
      state.email = "";
      state.uid = "";
      state.allUploadsURL = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.email = action.payload.emailID;
      state.uid = action.payload.uid;
      state.name = "authenticated";
      console.log(
        state,
        action.payload,
        "printed in auth reducer signup fulfilled",
      );
    });
    builder.addCase(logInUserHandler.fulfilled, (state, action) => {
      state.email = action.payload.emailID;
      state.uid = action.payload.uid;
      state.name = "authenticated";
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
        "printed in auth reducer",
      );
    });
    builder.addCase(pushLinkToFirebase.fulfilled, (state, action) => {
      state.allUploadsURL = [
        ...state.allUploadsURL,
        { [action.payload.asset_id]: action.payload },
      ];
    });
    builder.addCase(fetchInitialData.pending, (state, action) => {
      console.log(action.payload, "fetchingData");
    });
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      console.log(action.payload, "fetchInitialData");
      state.email = action.payload.data.email;
      ((state.uid = action.payload.uid),
        (state.allUploadsURL = action.payload.data.allUploadsURL));
    });
    builder.addCase(fetchInitialData.rejected, (state, action) => {
      console.log(action.payload, "fetching failed");
    });
  },
});

export default authReducer.reducer;
export const { setAuthState, clearAuthState } = authReducer.actions;
export { fetchInitialData };
