// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://clg-placementproject-backend.onrender.com/api',
  timeout: 10000,
});

// Add request interceptor to inject token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token found - redirecting to login');
    window.location.href = '/login';
  }
  return config;
});

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
