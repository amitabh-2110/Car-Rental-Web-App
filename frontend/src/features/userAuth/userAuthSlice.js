import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: "",
  role: ""
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    }
  }
});

export const {setToken, setUsername, setRole} = userAuthSlice.actions;
export default userAuthSlice.reducer;