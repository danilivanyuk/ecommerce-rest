import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subCategoriesArr: [],
  isLoading: true,
};
let getSubCategories_url = `/api/getSubCategories/`;

export const getSubCategories = createAsyncThunk(
  getSubCategories_url,
  async () => {
    try {
      const resp = await axios(getSubCategories_url);
      return resp.data;
    } catch {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const subCategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: {
    [getSubCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.subCategoriesArr = action.payload;
    },
    [getSubCategories.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export default subCategoriesSlice.reducer;
