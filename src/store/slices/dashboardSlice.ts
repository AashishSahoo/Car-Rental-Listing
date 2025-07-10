"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  userId: string;
  username: string;
  adminId: string | null;
  rejectionReason: string | null;
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

export const fetchListings = createAsyncThunk<
  Listing[],
  void,
  { rejectValue: string }
>("dashboard/fetchListings", async (_, thunkAPI) => {
  try {
    const res = await axios.get<Listing[]>("/api/dashboard");
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to fetch listings"
    );
  }
});

export const updateListingStatus = createAsyncThunk<
  Listing,
  {
    id: string;
    status: "approved" | "rejected";
    rejectionReason?: string | null;
  },
  { rejectValue: string }
>(
  "dashboard/updateListingStatus",
  async ({ id, status, rejectionReason }, thunkAPI) => {
    try {
      const updatedData = {
        status,
        ...(status === "rejected" && { rejectionReason }),
      };
      const res = await axios.put<{ updatedItem: Listing }>("/api/dashboard", {
        id,
        updatedData,
      });
      return res.data.updatedItem;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update listing status"
      );
    }
  }
);

export const updateListing = createAsyncThunk<
  Listing,
  { id: string; updatedData: Partial<Listing> },
  { rejectValue: string }
>("dashboard/updateListing", async ({ id, updatedData }, thunkAPI) => {
  try {
    const res = await axios.post<{ updatedItem: Listing }>("/api/dashboard", {
      id,
      updatedData,
    });
    return res.data.updatedItem;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Failed to update listing"
    );
  }
});

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
        state.error = action.payload || "Failed to load data";
      })
      .addCase(updateListingStatus.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.listings = state.listings.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.listings = state.listings.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );
      });
  },
});

export default dashboardSlice.reducer;
