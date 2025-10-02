import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend-bguf.onrender.com';

const API = axios.create({
  baseURL: API_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;