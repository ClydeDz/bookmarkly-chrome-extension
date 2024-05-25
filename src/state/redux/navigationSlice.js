import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentNodeId: 1,
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
