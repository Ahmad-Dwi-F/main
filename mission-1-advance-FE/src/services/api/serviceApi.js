import axiosClient from "./axiosClient";

export const authService = {
  getAllUsers: async () => {
    const response = await axiosClient.get("/user_account");
    return response.data;
  },

  registerUser: async (userData) => {
    const response = await axiosClient.post("/user_account", userData);
    return response.data;
  },
};

export const courseCardServices = {
  createOrder: async (orderData) => {
    const response = await axiosClient.post("/course", orderData);
    return response.data;
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const getResponse = await axiosClient.get(`/course?orderId=${orderId}`);
      const foundOrders = getResponse.data;

      if (!foundOrders || foundOrders.length === 0) {
        throw new Error("Pesanan tidak ditemukan");
      }

      const mockApiId = foundOrders[0].id;

      const putResponse = await axiosClient.put(`/course/${mockApiId}`, {
        status: newStatus,
      });

      return putResponse.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("Data tidak ditemukan", { cause: error });
      }
      throw error;
    }
  },
};
