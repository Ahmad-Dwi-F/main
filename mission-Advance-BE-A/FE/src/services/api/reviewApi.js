import apiClient from "./apiClient";

export const reviewApi = {
  list: (productId) =>
    apiClient.get(`/review/${productId}`).then((res) => res.data),
  getMine: (productId) =>
    apiClient.get(`/review/${productId}/saya`).then((res) => res.data),
  save: (productId, data) =>
    apiClient.put(`/review/${productId}`, data).then((res) => res.data),
};
