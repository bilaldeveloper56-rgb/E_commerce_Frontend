import axiosInstance from "../utils/axiosInstance";

export const getNotificationsApi = async () => {
  const response = await axiosInstance.get("/notification/");
  return response.data;
};

export const markNotificationReadApi = async (id) => {
  const response = await axiosInstance.put(`/notification/${id}/read`);
  return response.data;
};

export const markAllNotificationsReadApi = async () => {
  const response = await axiosInstance.put("/notification/read-all");
  return response.data;
};

const notificationService = {
  getNotifications: getNotificationsApi,
  markRead: markNotificationReadApi,
  markAllRead: markAllNotificationsReadApi,
};

export default notificationService;
