import axios, { AxiosError } from "axios";
import { API_ROOT } from "../config/config";

export const httpClient = axios.create({
	baseURL: API_ROOT,
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
	},
	
  (error: AxiosError) => {
    if (error?.response?.status === 403) {
      window.location.href = '/error/403';
    } else if (error?.response?.status === 404) {
      window.location.href = '/error/404';
    } else if (error?.response?.status === 401) {
      window.location.href = '/';
		}
		
    return Promise.reject(error);
  }
);