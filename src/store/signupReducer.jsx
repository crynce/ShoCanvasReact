import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, app } from "../utility/fireConfig";
//creating user With Email
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

const addNewUser = createAsyncThunk(
  "signupFormReducer/addNewUser",
  async (signupCreds, thunkAPI) => {
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupCreds.EmailID,
        signupCreds.Password
      );
      const user = userCredential.user;

      // 2. Save user data to Firestore (optional)
      const docRef = await setDoc(doc(db, "Users", user.uid), {
        email: signupCreds.EmailID,
        createdAt: new Date().toISOString(),
      });

      //   console.log(
      //     "User created and document written with ID:",
      //     docRef.id,
      //     user.accessToken
      //   );

      return {
        emailID: signupCreds.EmailID,
        docRefId: docRef?.id,
        uid: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Creating User: " + error.message);
    }
  }
);
const logInUserHandler = createAsyncThunk(
  "signupFormReducer/logInUserHandler",
  async (signupCreds, thunkAPI) => {
    console.log("this also called");
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signupCreds.EmailID,
        signupCreds.Password
      );
      const user = userCredential.user;
      //   getting snapshot of already present data
      console.log(db, "Users", user.uid);
      const docRef = doc(db, "Users", user.uid);
      const userDataSnapshot = await getDoc(docRef);
      console.log(userDataSnapshot, "userDataSnapshot");
      if (userDataSnapshot.exists()) {
        const data = userDataSnapshot.data();
        console.log("current Data:" + data);
        await updateDoc(docRef, {
          loggedInAt: new Date().toISOString(),
        });
      } else {
        throw new Error("No such user available");
      }
      console.log(
        "User created and document written with ID:",
        docRef.id,
        user.accessToken
      );

      return {
        emailID: signupCreds.EmailID,
        docRefId: docRef?.id,
        uid: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Creating User: " + error.message);
    }
  }
);

const signupFormReducer = createSlice({
  name: "signupFormReducer",
  initialState: { email: "", userId: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      (state.email = action.payload.emailID),
        (state.userId = action.payload.uid);
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      console.log("Request rejected" + action.payload);
    });
    builder.addCase(logInUserHandler.fulfilled, (state, action) => {
      console.log(action.payload, "retrievedData");
    });
  },
});

export default signupFormReducer.reducer;
// export const { getDataFromSignupForm } = signupFormReducer.actions;
export { addNewUser, logInUserHandler };
