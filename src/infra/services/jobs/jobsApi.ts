import api from '../axios';
import { AddJobRequest } from './requests/addJobRequest';
import { UpdateJobRequest } from './requests/updateJobRequest';

export const addJob = (request: AddJobRequest) => {
  const formData = new FormData();

  formData.append('file', request.companyLogo!);

  Object.entries(request).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  return api.post('/jobs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getJobsByUser = (filter?: string) => {
  return api.get(`/jobs/get-by-user?${filter}`);
};

export const getJobs = (filter: string | null) => {
  return api.get(`/jobs?${filter}`);
};

export const getJobDetails = (id: string) => {
  return api.get(`/jobs/details/${id}`);
};

export const updateJob = (request: UpdateJobRequest) => {
  return api.put('jobs', request);
};

export const updatePositionFilled = (jobId: string) => {
  return api.patch('jobs', { jobId });
};
