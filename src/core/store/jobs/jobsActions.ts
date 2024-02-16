import { createAsyncThunk } from '@reduxjs/toolkit';
import * as jobsApi from '../../../infra/services/jobs/jobsApi';
import { UpdateJobRequest } from '../../../infra/services/jobs/requests/updateJobRequest';
import { showToast } from '../../../shared/utils/toast';
import { handleError } from '../errorHandler';
import { getUserBundlesAction } from '../users/usersActions';

export const addJobAction = createAsyncThunk('jobs/add-job', async ({ request, navigate }: any, { dispatch, rejectWithValue }) => {
  try {
    const response = await jobsApi.addJob(request);

    if (response.status === 201) {
      const getJobsPromise = dispatch(getJobsAction(null));
      const getBundlesPromise = dispatch(getUserBundlesAction());
      await Promise.all([getJobsPromise, getBundlesPromise]);
      navigate('/profile');
      showToast('Position created successfully', 'success');
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

export const updateJobAction = createAsyncThunk('jobs/update', async (request: UpdateJobRequest, { rejectWithValue }) => {
  try {
    const response = await jobsApi.updateJob(request);

    if (response.status === 204) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
