import axiosInstance from "../utils/axiosInstance";

export const getAllUsersApi = async (params = {}) => {
  const response = await axiosInstance.get("/user/allusers", { params });
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data;
};

export const updateProfileApi = async (profileData) => {
  const response = await axiosInstance.put("/user/profile", profileData);
  return response.data;
};

const userService = {
  getAllUsers: getAllUsersApi,
  getProfile: getProfileApi,
  updateProfile: updateProfileApi,
};

export default userService;
