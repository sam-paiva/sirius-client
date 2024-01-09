import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jobsApi from '../../infra/services/jobs/jobsApi';
import { handleError } from '../errorHandler';

export const addJobAction = createAsyncThunk('jobs/add-job', async ({ request, navigate }: any, { rejectWithValue }) => {
  try {
    const response = await jobsApi.addJob(request);

    if (response.status === 201) {
      navigate('/admin');
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const getJobsByUserAction = createAsyncThunk('jobs/get-jobs-by-user', async (_, { rejectWithValue }) => {
  try {
    const response = await jobsApi.getJobsByUser();

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const getJobsAction = createAsyncThunk('jobs/get-jobs', async (_, { rejectWithValue }) => {
  try {
    const response = await jobsApi.getJobs();

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
