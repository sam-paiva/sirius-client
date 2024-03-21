import axios from 'axios';
import { checkifUserIsAuthenticated, getJwtToken } from './auth/authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

        window.location.href = 'sign-in';
        window.location.reload();

        return axios(config);
      }
      return Promise.reject(error);
    }
  }
);

api.interceptors.request.use(
  function (config) {
    // Get the JWT token
    const jwtToken = getJwtToken();

    // If token exists, add it to the request headers
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
