import { useSelector, useDispatch } from "react-redux";
import {
  addOrder as addOrderAction,
  updateOrderStatus as updateOrderStatusAction,
} from "../rtk/feature/order/orderSlice";

export function useOrders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const addOrder = (order) => dispatch(addOrderAction(order));
  const updateOrderStatus = (orderId, status) =>
    dispatch(updateOrderStatusAction({ orderId, status }));
  return { orders, addOrder, updateOrderStatus };
}
