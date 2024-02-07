import api from '../axios';

export const getBundlesByUser = () => {
  return api.get('/users/get-bundles');
};

export const createCompany = (data: any) => {
  const formData = new FormData();

  formData.append('file', data.logo);

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  return api.post('/users/create-company', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
