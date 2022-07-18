import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsArr: [],
  isLoading: true,
};

const getProductsUrl = `/api/getProducts/`;

export const getProducts = createAsyncThunk(getProductsUrl, async () => {
  try {
    const resp = await axios(getProductsUrl);
    return resp.data;
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsArr = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default productsSlice.reducer;
