import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_BASE_URL}`,
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    // if (error.response.status === 403) {
    //     return (window.location.href = '/auth/login');
    // }
    return Promise.reject(error);
  }
);

export default api;
