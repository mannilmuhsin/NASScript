import axios from 'axios';
import { BASE_URL } from '../constants/baseUrls';
// import { useNavigate } from 'react-router-dom';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token2'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized (401) - Handle logout
      localStorage.removeItem('token2'); // Remove token from localStorage
      // Redirect to login page (if using React Router)
      window.location.href = '/login'; // Or use a method to navigate programmatically in React Router
    }
    return Promise.reject(error);
  }
);

export { api };
