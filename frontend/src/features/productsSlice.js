import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsArr: [],
  isLoading: true,
  isProductsSuccess: false,
  filteredProductsArr: [],
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
  reducers: {
    filterProductsBySubCategory: (state, action) => {
      let subcategorySlug = action.payload;
      state.productsArr = state.productsArr.filter(
        (product) => product.subcategorySlug === subcategorySlug
      );
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
      state.isProductsSuccess = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.productsArr = action.payload;
      state.isLoading = false;
      state.isProductsSuccess = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isProductsSuccess = false;
    },
  },
});

export const { filterProductsBySubCategory } = productsSlice.actions;

export default productsSlice.reducer;
