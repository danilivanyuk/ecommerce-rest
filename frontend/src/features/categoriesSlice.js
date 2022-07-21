import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { filterSubcategoriesByCategory } from "./subCategoriesSlice";

const initialState = {
  categoriesArr: [],
  isLoading: true,
};
let getCategoriesUrl = `/api/getCategories/`;

export const getCategories = createAsyncThunk(getCategoriesUrl, async () => {
  try {
    const resp = await axios(getCategoriesUrl);
    return resp.data;
  } catch {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoriesArr = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default categoriesSlice.reducer;
