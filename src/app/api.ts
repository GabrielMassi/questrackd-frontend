import axios from "axios";

export const API = axios.create({
  baseURL: "http://arthurtv.duckdns.org:9998/api", // Replace with your computer's IP
});

export default API;
