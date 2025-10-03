import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-1-y9jk.onrender.com", // Change to your deployed backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
