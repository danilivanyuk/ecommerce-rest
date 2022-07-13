import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./features/categoriesSlice";
import subCategoryReducer from "./features/subCategoriesSlice";
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    subcategories: subCategoryReducer,
  },
});
