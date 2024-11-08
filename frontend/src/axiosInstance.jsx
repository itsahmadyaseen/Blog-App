import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://blogjournal-nu.vercel.app",

  withCredentials: true, // Send cookies along with requests
});

// Interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = `/unauthorized`;
    }
  }
);

export default axiosInstance;
