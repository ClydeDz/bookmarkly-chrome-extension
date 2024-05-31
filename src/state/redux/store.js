import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import drawerReducer from "./drawerSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    drawer: drawerReducer,
  },
});
