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
