import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error formatting and auth session handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if session expired or unauthorized
    if (error.response && error.response.status === 401) {
      // If we are unauthorized and not on the login page, clear token and refresh or redirect
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/signup") {
        localStorage.removeItem("token");
        // We can let the authSlice handle it, or force a redirect if needed:
        window.dispatchEvent(new Event("auth-unauthorized"));
      }
    }
    
    // Normalize error message for easier usage across thunks
    const message = 
      error.response?.data?.message || 
      error.response?.data?.error || 
      error.message || 
      "An unexpected error occurred.";
      
    const parsedError = new Error(message);
    parsedError.response = error.response;
    parsedError.status = error.response?.status;
    
    return Promise.reject(parsedError);
  }
);

export default axiosInstance;
