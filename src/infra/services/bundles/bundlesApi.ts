import api from '../axios';

export const getBundles = () => {
  return api.get('/bundles');
};

export const getBundlesByUser = () => {
  return api.get('/bundles/get-by-user');
};
