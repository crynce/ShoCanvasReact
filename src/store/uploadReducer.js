import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { app, db } from "../utility/fireConfig";

const pushLinkToFirebase = createAsyncThunk(
  "uploadReducer/pushLinkToFirebase",
  async (data, thunkAPI) => {
    try {
      const docRef = doc(db, "Users", data.uid);
      await updateDoc(docRef, {
        allUploadsURL: arrayUnion({
          [data.asset_id]: {
            public_id: data.public_id,
            secure_id: data.secure_url,
            asset_id: data.asset_id,
            createdAt: new Date().toISOString(),
          },
        }),
      });
      return {
        public_id: data.public_id,
        secure_id: data.secure_url,
        asset_id: data.asset_id,
        createdAt: new Date().toISOString(),
      };
    } catch (err) {
      throw Error(`Upload Failed: ${err.message || err.status}`);
    }
  },
);
const uploadReducer = createSlice({
  name: "uploadReducer",
  initialState: {
    allUploadsURL: [],
    currUploadData: { public_id: "", secure_url: "", asset_id: "" },
    err: "",
  },

  reducers: {
    updateUploadData: (state, action) => {
      const currUploadData = {
        [action.payload.asset_id]: {
          public_id: action.payload.public_id,
          secure_id: action.payload.secure_url,
          asset_id: action.payload.asset_id,
          createdAt: new Date().toISOString(),
        },
      };

      state.allUploadsURL = [...state.allUploadsURL, currUploadData];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pushLinkToFirebase.fulfilled, (state, action) => {
      state.allUploadsURL = [
        ...state.allUploadsURL,
        { [action.payload.asset_id]: action.payload },
      ];
    });
  },
});
export default uploadReducer.reducer;
export const { updateUploadData } = uploadReducer.actions;

export { pushLinkToFirebase };
