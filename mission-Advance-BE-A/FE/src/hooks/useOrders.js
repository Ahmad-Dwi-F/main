import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  fetchOrders,
  placeOrder,
} from "../rtk/feature/order/orderSlice";

export function useOrders({ autoLoad = false } = {}) {
  const dispatch = useDispatch();
  const { items: orders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    if (autoLoad) dispatch(fetchOrders());
  }, [autoLoad, dispatch]);

  return {
    orders,
    status,
    placeOrder: (data) => dispatch(placeOrder(data)).unwrap(),
    cancelOrder: (orderId) => dispatch(cancelOrder(orderId)).unwrap(),
  };
}
