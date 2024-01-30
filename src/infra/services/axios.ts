import axios from 'axios';
import { logout } from './auth/authApi';
import { checkifUserIsAuthenticated } from './auth/authService';

console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const config = error?.config;

      if ((error?.response?.status === 401 || !checkifUserIsAuthenticated()) && !config?.sent) {
        config.sent = true;

        logout().then(() => {
          window.location.href = 'home';
          window.location.reload();
        });

        return axios(config);
      }
      return Promise.reject(error);
    }
  }
);

export default api;
