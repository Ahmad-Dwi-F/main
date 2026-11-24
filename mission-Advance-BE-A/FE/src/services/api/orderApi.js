import apiClient from "./apiClient";
import { assetUrl } from "../../utils/assetUrl";

const toOrder = (order) => ({ ...order, image: assetUrl(order.image) });

export const orderApi = {
  getAll: () => apiClient.get("/orders").then((res) => res.data.map(toOrder)),
  create: (data) =>
    apiClient.post("/orders", data).then((res) => toOrder(res.data)),
  updateStatus: (orderId, status) =>
    apiClient
      .patch(`/orders/${orderId}`, { status })
      .then((res) => toOrder(res.data)),
};
