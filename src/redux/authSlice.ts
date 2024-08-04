// src/redux/authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

// Define the shape of the state
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      credentials
    );
    return response.data;
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;

// Selector to access authentication state
export const selectAuth = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
