import axiosInstance from "../utils/axiosInstance";

export const loginUserApi = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const signupUserApi = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export const getMeApi = async () => {
  const response = await axiosInstance.get("/auth/me");
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

export const forgotPasswordApi = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPasswordApi = async (token, newPassword) => {
  const response = await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
  return response.data;
};

const authService = {
  login: loginUserApi,
  signup: signupUserApi,
  getMe: getMeApi,
  getProfile: getProfileApi,
  updateProfile: updateProfileApi,
  forgotPassword: forgotPasswordApi,
  resetPassword: resetPasswordApi,
};

export default authService;
