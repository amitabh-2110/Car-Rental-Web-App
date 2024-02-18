import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/userAuth/userAuthSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

export default store;