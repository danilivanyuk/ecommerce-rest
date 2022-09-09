import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartArr: [],
  isLoading: true,
};

const getCustomerCart = `api/getCart/`;

export const getCart = createAsyncThunk(getCustomerCart, async () => {
  try {
    const resp = await axios(getCustomerCart);
    return resp.data;
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

const createSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartArr = action.payload;
    },
    [getCart.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default createSlice.reducer;
