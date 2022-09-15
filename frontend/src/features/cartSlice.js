import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const initialState = {
  cartArr: [],
  isLoading: true,
  cartCounter: 0,
  shippingCost: 5.0,
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

// LINKS
const DELETEITEMFROMCART = "api/removeProductFromCart/";
const EDITITEMQUANTITY = "api/editProductFromCart/";

const updateCartUrl = `api/updateCart/`;
export const updateCart = createAsyncThunk(updateCartUrl, async () => {
  try {
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
});

async function removeProductFromCart(orderProductId) {
  let csrftoken = getCookie("csrftoken");
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  const url = DELETEITEMFROMCART + orderProductId + "/";
  try {
    const resp = await axios.delete(url, {
      headers,
    });
  } catch {
    return thunkAPI.rejectWithValue("Something went wrong with products");
  }
}

async function editQuantity(orderProduct) {
  let csrftoken = getCookie("csrftoken");
  const url = EDITITEMQUANTITY + orderProduct.id + "/";
  const orderProductData = {
    quantity: orderProduct.quantity,
  };
  const headers = {
    "Content-type": "application/json",
    "X-CSRFToken": csrftoken,
  };
  let error = "";
  axios.post(url, orderProductData, { headers }).catch((e) => {
    error = e;
    console.log(error);
  });
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {},
    removeProduct: (state, action) => {
      state.cartArr = state.cartArr.filter((orderProduct) => {
        if (orderProduct.id === action.payload) {
          removeProductFromCart(orderProduct);
        }
        return orderProduct.id !== action.payload;
      });
    },
    addQuantity: (state, action) => {
      let selectedItem = state.cartArr.find(
        (cartItem) => cartItem.id === action.payload
      );
      selectedItem.quantity++;
      editQuantity(selectedItem);
    },
    removeQuantity: (state, action) => {
      let selectedItem = state.cartArr.find(
        (cartItem) => cartItem.id === action.payload
      );
      selectedItem.quantity--;
      editQuantity(selectedItem);
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
