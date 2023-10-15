import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLogin: (
      state,
      action: PayloadAction<{ user: string; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    userLogout: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
