import { createSlice } from "@reduxjs/toolkit";
import { RECENT_BOOKMARKS_NODE_ID } from "../../const/app";

const initialState = {
  currentNodeId: RECENT_BOOKMARKS_NODE_ID,
  itemId: undefined,
};

export const navigationSlice = createSlice({
  name: "navigation slice",
  initialState,
  reducers: {
    setCurrentNodeId: (state, action) => {
      state.currentNodeId = action.payload;
    },
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
  },
});

export const { setCurrentNodeId, setItemId } = navigationSlice.actions;

export default navigationSlice.reducer;
