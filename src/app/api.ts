import axios from "axios";

export const API = axios.create({
  //baseURL: "http://MEU-IP:3000/api", //Rodando localmente (dev)
  baseURL: "http://arthurtv.duckdns.org:9998/api", //Produção
});

export default API;
