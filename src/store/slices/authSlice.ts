"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockUsers } from "@/utils/userData";

interface AuthSlice {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthSlice = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login Failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
