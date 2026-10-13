import apiClient from "./apiClient";

export const authApi = {
  register: (data) =>
    apiClient.post("/auth/register", data).then((res) => res.data),
  login: (data) => apiClient.post("/auth/login", data).then((res) => res.data),
  updateProfile: (data) =>
    apiClient.put("/users/me", data).then((res) => res.data),
  deleteAccount: () => apiClient.delete("/users/me"),
};
