import { ADD_ORDER, UPDATE_ORDER_STATUS } from "../action";

const STORAGE_KEY = "videobelajar_orders";

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const initialState = loadOrders();

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [action.payload, ...state];

    case UPDATE_ORDER_STATUS:
      return state.map((order) =>
        order.orderId === action.payload.orderId
          ? { ...order, status: action.payload.status }
          : order,
      );

    default:
      return state;
  }
}
