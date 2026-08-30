import { combineReducers } from "redux";
import { orderReducer } from "./orderReducer";
import { enrollmentReducer } from "./enrollmentReducer";

export const allReducer = combineReducers({
  orders: orderReducer,
  enrollments: enrollmentReducer,
});
