// src/api.js

import axios from 'axios';

// Create a new Axios instance with a base configuration
const API = axios.create({
  baseURL: 'https://backend-bguf.onrender.com' // Your Render backend URL
});

// Use an interceptor to add the authentication token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;