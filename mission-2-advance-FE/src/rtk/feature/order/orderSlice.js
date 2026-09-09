import { createSlice } from "@reduxjs/toolkit";
const STORAGE_KEY = "videobelajar_orders";

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const saveOrderToStorage = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Gagal menyimpan pesanan ke localStorage:", error);
  }
};

const initialState = loadOrders();

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
      saveOrderToStorage(state);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.find((order) => order.orderId === orderId);
      if (order) {
        order.status = status;
        saveOrderToStorage(state);
      }
    },
    resetOrders: () => [],
  },
});
export default orderSlice.reducer;
export const { addOrder, updateOrderStatus, resetOrders } = orderSlice.actions;
