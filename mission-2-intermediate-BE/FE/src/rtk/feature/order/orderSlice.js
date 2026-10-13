import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../../services/api/orderApi";

const withMessage =
  (request) =>
  async (arg, { rejectWithValue }) => {
    try {
      return await request(arg);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? "Terjadi kesalahan pada server.",
      );
    }
  };

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  withMessage(() => orderApi.getAll()),
);
export const placeOrder = createAsyncThunk(
  "orders/place",
  withMessage((data) => orderApi.create(data)),
);
export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  withMessage((orderId) => orderApi.updateStatus(orderId, "gagal")),
);

const initialState = { items: [], status: "idle" };

const upsert = (state, order) => {
  const index = state.items.findIndex((item) => item.orderId === order.orderId);
  if (index === -1) state.items.unshift(order);
  else state.items[index] = order;
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "ready";
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "error";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        upsert(state, action.payload);
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        upsert(state, action.payload);
      });
  },
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
