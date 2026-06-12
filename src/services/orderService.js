import axiosInstance from "../utils/axiosInstance";

export const getOrdersApi = async () => {
  const response = await axiosInstance.get("/order/myorders");
  return response.data;
};

export const getAllOrdersAdminApi = async () => {
  const response = await axiosInstance.get("/order/all");
  return response.data;
};

export const createOrderApi = async (orderData) => {
  const response = await axiosInstance.post("/order/create", orderData);
  return response.data;
};

export const confirmOrderApi = async (orderId) => {
  const response = await axiosInstance.put(`/order/${orderId}/confirm`);
  return response.data;
};

const orderService = {
  getOrders: getOrdersApi,
  getAllOrdersAdmin: getAllOrdersAdminApi,
  createOrder: createOrderApi,
  confirmOrder: confirmOrderApi,
};

export default orderService;
