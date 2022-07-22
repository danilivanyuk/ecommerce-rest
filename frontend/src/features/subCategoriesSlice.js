import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subCategoriesArr: [],
  filteredSubCategoriesArr: [],
  isLoading: true,
  isSubCategorySuccess: false,
  isError: true,
};
let getSubCategories_url = `/api/getSubCategories/`;

export const getSubCategories = createAsyncThunk(
  getSubCategories_url,
  async (thunkAPI) => {
    try {
      const resp = await axios(getSubCategories_url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const subCategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {
    filterSubcategoriesByCategory: (state, action) => {
      const categoryId = action.payload;
      state.subCategoriesArr = state.subCategoriesArr.filter(
        (subcategory) => subcategory.category === categoryId
      );
    },
  },
  extraReducers: {
    [getSubCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSubCategorySuccess = true;
      state.subCategoriesArr = action.payload;
    },
    [getSubCategories.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { filterSubcategoriesByCategory } = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
