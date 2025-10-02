// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://backend-bguf.onrender.com'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;