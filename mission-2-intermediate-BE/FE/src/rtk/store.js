import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./feature/order/orderSlice";

const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});

export default store;
