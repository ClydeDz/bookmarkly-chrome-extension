import { createSlice } from "@reduxjs/toolkit";
import { RECENT_BOOKMARKS_NODE_ID } from "../../const/app";

const initialState = {
  currentNodeId: RECENT_BOOKMARKS_NODE_ID,
};

export const navigationSlice = createSlice({
  name: "navigation slice",
  initialState,
  reducers: {
    setCurrentNodeId: (state, action) => {
      state.currentNodeId = action.payload;
    },
  },
});

export const { setCurrentNodeId } = navigationSlice.actions;

export default navigationSlice.reducer;
