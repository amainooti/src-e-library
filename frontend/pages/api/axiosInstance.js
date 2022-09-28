import axios from "axios";

const BASE_URL = process.env.HOST_URL;

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
