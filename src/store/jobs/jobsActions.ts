import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jobsApi from '../../infra/services/jobs/jobsApi';
import { handleError } from '../errorHandler';

export const addJobAction = createAsyncThunk('jobs/add-job', async ({ request, navigate }: any, { dispatch, rejectWithValue }) => {
  try {
    const response = await jobsApi.addJob(request);

    if (response.status === 201) {
      await dispatch(getJobsAction(null));
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

export const getJobsAction = createAsyncThunk('jobs/get-jobs', async (filter: string | null = null, { rejectWithValue }) => {
  try {
    const response = await jobsApi.getJobs(filter);

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const getJobByIdAction = createAsyncThunk('jobs/details', async (id: string, { rejectWithValue }) => {
  try {
    const response = await jobsApi.getJobDetails(id);

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
