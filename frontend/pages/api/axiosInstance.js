import axios from "axios";
import { getFromLocalStorage } from "../../utils/browserStorage";

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
    Authorization: `Bearer ${getFromLocalStorage("token")}`,
  },
  withCredentials: true,
});

export default axiosInstance;
