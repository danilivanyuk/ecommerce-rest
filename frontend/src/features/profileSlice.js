import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  customerInfo: [],
  customerOrders: [],
  isLoading: true,
};

const getProfileUrl = `/api/getProfile/`;

export const getProfile = createAsyncThunk(getProfileUrl, async () => {
  try {
    const resp = await axios(getProfileUrl);
    return resp.data;
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

const getCustomerOrdersUrl = `/api/getCustomerOrders/`;

export const getCustomerOrders = createAsyncThunk(
  getCustomerOrdersUrl,
  async () => {
    try {
      const resp = await axios(getCustomerOrdersUrl);
      return resp.data;
    } catch {
      return thunkAPI.rejectWithValue("Something went wrong with products");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.customerInfo = action.payload;
    },
    [getProfile.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getCustomerOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomerOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.customerOrders = action.payload;
    },
    [getCustomerOrders.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

// export const {  } = profileSlice.actions;

export default profileSlice.reducer;
