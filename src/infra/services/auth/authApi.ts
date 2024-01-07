import api from "../axios";

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

export const addRole = (role: string) => {
  return api.patch('/auth/add-role', `"${role}"`);
}