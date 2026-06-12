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

const authService = {
  login: loginUserApi,
  signup: signupUserApi,
  getMe: getMeApi,
  getProfile: getProfileApi,
  updateProfile: updateProfileApi,
};

export default authService;
