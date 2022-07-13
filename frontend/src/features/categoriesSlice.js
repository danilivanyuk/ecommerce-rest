import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categoriesArr: [],
  isLoading: true,
};
let getCategories_url = `/api/getCategories/`;

export const getCategories = createAsyncThunk(getCategories_url, async () => {
  try {
    const resp = await axios(getCategories_url);
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
      console.log(action);
      state.isLoading = false;
    },
  },
});

export default categoriesSlice.reducer;
