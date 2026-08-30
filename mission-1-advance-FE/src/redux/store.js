import { createStore } from "redux";
import { allReducer } from "./reducer";

export const store = createStore(allReducer);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("videobelajar_orders", JSON.stringify(state.orders));
  localStorage.setItem(
    "videobelajar_enrollments",
    JSON.stringify(state.enrollments),
  );
});
