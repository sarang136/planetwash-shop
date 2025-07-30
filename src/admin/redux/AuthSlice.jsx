import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./appSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("shopDetails")),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        
        console.log("verifyOtp payload received:", payload);
        state.user = payload.shop; 
        localStorage.setItem("shopDetails",JSON.stringify(state.user))
      }
    );
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
