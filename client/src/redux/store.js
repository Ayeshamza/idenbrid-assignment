import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./Reducers/cartReducer";

const reducer = combineReducers({
  cart: productReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
