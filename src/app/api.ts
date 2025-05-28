import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.65:3000/api",
  //baseURL: "http://arthurtv.duckdns.org:9998/api",
});

export default API;
