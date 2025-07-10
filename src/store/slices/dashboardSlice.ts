"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // ✅ Import axios

interface Listing {
  id: string;
  title: string;
  status: string;
  category: string;
  price: number;
  createdAt: string;
}

interface DashboardState {
  listings: Listing[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  listings: [],
  loading: false,
  error: null,
};

export const fetchListings = createAsyncThunk(
  "dashboard/fetchListings",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<Listing[]>("/api/dashboard");
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch listings"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load data";
      });
  },
});

export default dashboardSlice.reducer;
