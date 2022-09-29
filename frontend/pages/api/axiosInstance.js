import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8080";
console.log("PROCESS");
console.log(process.env.NEXT_PUBLIC_API);
const BASE_URL = process.env.NEXT_PUBLIC_API;

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
