import api from '../axios';
import { AddJobRequest } from './requests/addJobRequest';

export const addJob = (job: AddJobRequest) => {
  return api.post('/jobs', job);
};

export const getJobsByUser = () => {
  return api.get('/jobs/get-by-user');
};

export const getJobs = (filter: string | null) => {
  return api.get('/jobs', { params: filter });
};

export const getJobDetails = (id: string) => {
  return api.get(`/jobs/details/${id}`);
};
