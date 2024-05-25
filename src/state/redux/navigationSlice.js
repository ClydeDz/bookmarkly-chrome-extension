import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const navigationSlice = createSlice({
  name: "navigation slice",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = navigationSlice.actions;

export default navigationSlice.reducer;
