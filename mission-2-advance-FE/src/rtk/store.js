import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./feature/order/orderSlice";
import enrollReducer from "./feature/enrollment/enrollSlice";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    enrollments: enrollReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("videobelajar_orders", JSON.stringify(state.orders));
  localStorage.setItem(
    "videobelajar_enrollments",
    JSON.stringify(state.enrollments),
  );
});

export default store;
