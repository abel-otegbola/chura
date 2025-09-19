import axios from "axios";
import { BASE_URL } from "./api/useUrl";


export function getCookie(name: string): string | null {
  return document.cookie
    .split(";")
    .map((c) => c.trim().split("="))
    .find(([cookieName]) => cookieName === name)?.[1] || null;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = getCookie("userToken");
  return token ? decodeURIComponent(token) : null;
}

export function setAuthToken(token: string | null) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // Store token in cookie
    document.cookie = `userToken=${encodeURIComponent(token)}; path=/;`;
  } else {
    delete axios.defaults.headers.common.Authorization;
    // Remove token from cookie
    document.cookie = "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export function getAuthorizationHeader(): string {
  const token = getAuthToken();
  return token ? `Bearer ${token}` : "";
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  timeoutErrorMessage: "Your request timed out, please check your internet connection",
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    common: {
        Authorization: getAuthorizationHeader(),
    },
  },
 
});

export const cancelTokenSource = axios.CancelToken.source();

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthorizationHeader();
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;