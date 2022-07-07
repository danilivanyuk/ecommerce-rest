import { createStore } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import rootReducer from "./reducers";

const rootReducer = combineReducers({});

// const middleWare = [thunk];

const store = configureStore({
  reducer: rootReducer,
});
