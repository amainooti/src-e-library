import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    ContentType: "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    ContentType: "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
