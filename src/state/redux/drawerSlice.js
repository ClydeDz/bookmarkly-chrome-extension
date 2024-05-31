import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerType: undefined,
};

export const drawerSlice = createSlice({
  name: "drawer slice",
  initialState,
  reducers: {
    setDrawerType: (state, action) => {
      state.drawerType = action.payload;
    },
  },
});

export const { setDrawerType } = drawerSlice.actions;

export default drawerSlice.reducer;
