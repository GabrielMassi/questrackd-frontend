import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const API = axios.create({
  baseURL: "http://192.168.1.65:3000/api", //Rodando localmente (dev)
  //baseURL: "http://arthurtv.duckdns.org:9002/api", //Produção
});

API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await AsyncStorage.removeItem("userToken");

      router.navigate("/(auth)");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default API;
