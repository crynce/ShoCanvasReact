import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db, app } from "../components/LoginForm/utility/firebaseConfig";
//creating user With Email
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { startLoading, stopLoading } from "./loadingReducer";

const auth = getAuth(app);

const addNewUser = createAsyncThunk(
  "signupFormReducer/addNewUser",
  async (signupCreds, thunkAPI) => {
    thunkAPI.dispatch(startLoading("Creating your account..."));
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupCreds.EmailID,
        signupCreds.Password,
      );
      const user = userCredential.user;

      // 2. Save user data to Firestore (optional)
      const docRef = await setDoc(doc(db, "Users", user.uid), {
        email: signupCreds.EmailID,
        createdAt: new Date().toISOString(),
      });

      thunkAPI.dispatch(stopLoading());

      return {
        emailID: signupCreds.EmailID,
        docRefId: docRef?.id,
        uid: user.uid,
      };
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue("Error Creating User: " + error.message);
    }
  },
);
const logInUserHandler = createAsyncThunk(
  "signupFormReducer/logInUserHandler",
  async (signupCreds, thunkAPI) => {
    thunkAPI.dispatch(startLoading("Logging you in..."));
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signupCreds.EmailID,
        signupCreds.Password,
      );
      const user = userCredential.user;
      //   getting snapshot of already present data
      const docRef = doc(db, "Users", user.uid);
      const userDataSnapshot = await getDoc(docRef);
      if (userDataSnapshot.exists()) {
        const data = userDataSnapshot.data();
        await updateDoc(docRef, {
          loggedInAt: new Date().toISOString(),
        });
      } else {
        throw new Error("No such user available");
      }

      thunkAPI.dispatch(stopLoading());

      return {
        emailID: signupCreds.EmailID,
        docRefId: docRef?.id,
        uid: user.uid,
      };
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue("Error Creating User: " + error.message);
    }
  },
);

const signupFormReducer = createSlice({
  name: "signupFormReducer",
  initialState: { email: "", userId: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      ((state.email = action.payload.emailID),
        (state.userId = action.payload.uid));
    });
    builder.addCase(addNewUser.rejected, (state, action) => {});
    builder.addCase(logInUserHandler.fulfilled, (state, action) => {
      state.userId = action.payload.uid;
      state.email = action.payload.emailID;
    });
  },
});

export default signupFormReducer.reducer;
// export const { getDataFromSignupForm } = signupFormReducer.actions;
export { addNewUser, logInUserHandler };
