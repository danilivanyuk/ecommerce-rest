import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categoriesSlice";
import subCategoriesReducer from "./features/subCategoriesSlice";
import productsReducer from "./features/productsSlice";
import profileReducer from "./features/profileSlice";
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    subcategories: subCategoriesReducer,
    products: productsReducer,
    profile: profileReducer,
  },
});
