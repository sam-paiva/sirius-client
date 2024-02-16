import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../../infra/services/auth/authApi';
import { getDecodedToken } from '../../../infra/services/auth/authService';
import { CreateCompanyRequest } from '../../../infra/services/users/requests/createCompanyRequest';
import * as usersApi from '../../../infra/services/users/userApi';
import { showToast } from '../../../shared/utils/toast';
import { handleError } from '../errorHandler';

export const logoutAction = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const response = await authApi.logout();

    if (response.status === 200) {
      window.location.href = '/home';
      window.location.reload();
      return response.data;
    }

    return thunkAPI.rejectWithValue({});
  } catch (error) {
    return thunkAPI.rejectWithValue({});
  }
});

export const loginCallbackAction = createAsyncThunk('users/loginCallback', async ({ navigate, from }: any, thunkAPI) => {
  try {
    const token = getDecodedToken();
    if (token) {
      if (from && from !== '/home') navigate(from);
      else navigate('/admin');

      return thunkAPI.fulfillWithValue({});
    }
    return thunkAPI.fulfillWithValue({});
  } catch (error) {
    return thunkAPI.rejectWithValue({});
  }
});

export const getUserBundlesAction = createAsyncThunk('users/get-user-bundles', async (_, { rejectWithValue }) => {
  try {
    const response = await usersApi.getBundlesByUser();

    if (response.status === 200) {
      return response.data;
    }

    return rejectWithValue({});
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const createCompanyAction = createAsyncThunk(
  'users/create-company',
  async ({ request, callback }: { request: CreateCompanyRequest; callback: () => void }, { rejectWithValue }) => {
    try {
      const response = await usersApi.createCompany(request);

      if (response.status === 201) {
        callback();
        showToast('Company saved successfully', 'success');
        return response.data;
      }

      return rejectWithValue({});
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
