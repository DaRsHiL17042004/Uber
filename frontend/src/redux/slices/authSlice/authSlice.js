// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    signupFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { signupStart, signupSuccess, signupFail } = authSlice.actions;
export default authSlice.reducer;
