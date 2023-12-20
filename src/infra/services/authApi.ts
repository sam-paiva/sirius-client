import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

console.log(import.meta.env.VITE_API_URL);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const config = error?.config;

      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;
        logout().then(() => {
          window.location.reload();
        });

        return axios(config);
      }
      return Promise.reject(error);
    }
  }
);

// api.interceptors.request.use(
//   async (config) => {
//     if (!config.headers!.Authorization) {
//       config.headers!.Authorization = `Bearer ${await getToken()!}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const logout = () => {
  return api.post('/auth/logout');
};
