import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { app, db } from "../utility/fireConfig";
import { getAuth } from "firebase/auth";

const pushLinkToFirebase = createAsyncThunk(
  "uploadReducer/pushLinkToFirebase",
  async (data, thunkAPI) => {
    console.log(thunkAPI.getState(), "getting State Snapshot");
    try {
      console.log(data, "pushImageLink");
      const docRef = doc(db, "Users", data.uid);
      console.log("Users", data.uid);
      console.log([...thunkAPI.getState()?.uploadsData?.allUploadsURL]);
      const allUploadsURL = [
        ...thunkAPI.getState()?.uploadsData?.allUploadsURL,
      ];
      console.log(allUploadsURL, "allUploadsURL");
      allUploadsURL.push({
        [data.asset_id]: {
          public_id: data.public_id,
          secure_id: data.secure_url,
          asset_id: data.asset_id,
          createdAt: new Date().toISOString(),
        },
      });

      await updateDoc(docRef, {
        allUploadsURL: allUploadsURL,
      });
      return allUploadsURL;
    } catch (err) {
      console.log(err, "err");
      throw Error(`Upload Failed: ${err.message || err.status}`);
    }
  }
);
const uploadReducer = createSlice({
  name: "uploadReducer",
  initialState: {
    allUploadsURL: [],
    currUploadData: { public_id: "", secure_url: "", asset_id: "" },
    err: "",
  },

  reducers: {
    setUploadImgData: (state, action) => {
      console.log("data received");
      state.currUploadData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pushLinkToFirebase.fulfilled, (state, action) => {
      state.allUploadsURL = action.payload.allUploadsURL;
      console.log("successful");
    });
  },
});
export default uploadReducer.reducer;
export const { setUploadImgData } = uploadReducer.actions;

export { pushLinkToFirebase };
