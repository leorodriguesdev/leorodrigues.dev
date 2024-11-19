import axios from "axios";

const api = axios.create({
  baseURL: "http://leorodrigues.dev/api",
  timeout: 5000,
});

export default api;
