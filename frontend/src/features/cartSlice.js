import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartArr: [],
  isLoading: true,
  cartCounter: 0,
};

const getCustomerCartUrl = `api/getCart/`;

export const getCart = createAsyncThunk(getCustomerCartUrl, async () => {
  try {
    const resp = await axios(getCustomerCartUrl);
    return resp.data;
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

const updateCartUrl = `api/updateCart/`;
export const updateCart = createAsyncThunk(updateCartUrl, async () => {
  try {
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {},
    removeProduct: (state, action) => {
      state.cartArr = state.cartArr.filter((orderProduct) => {
        return orderProduct.id !== action.payload;
      });
    },
    addQuantity: (state, action) => {
      let selectedItem = state.cartArr.find(
        (cartItem) => cartItem.id === action.payload
      );
      selectedItem.quantity++;
    },
    removeQuantity: (state, action) => {
      let selectedItem = state.cartArr.find(
        (cartItem) => cartItem.id === action.payload
      );
      selectedItem.quantity--;
    },
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartArr = action.payload;
      state.cartCounter = action.payload.length;
    },
    [getCart.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addToCart, removeProduct, addQuantity, removeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
