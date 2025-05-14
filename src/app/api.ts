import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your computer's IP
});

export default API;
