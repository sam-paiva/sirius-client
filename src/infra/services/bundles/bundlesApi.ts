import api from '../axios';

export const getBundles = () => {
  return api.get('/bundles');
};
