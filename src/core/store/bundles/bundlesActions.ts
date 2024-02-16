import { createAsyncThunk } from '@reduxjs/toolkit';
import * as bundlesApi from '../../../infra/services/bundles/bundlesApi';
import { handleError } from '../errorHandler';

export const getBundlesAction = createAsyncThunk('bundles/get-bundles', async (_, { rejectWithValue }) => {
  try {
    const response = await bundlesApi.getBundles();

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
