import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.surebucksng.com', 
    timeout: 10000, // Request timeout
});

apiClient.interceptors.request.use(
  async (config) => {
    // Example using Zustand for token:
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Session expired — Logging out");
    }
    return Promise.reject(err);
  }
);

export default apiClient;