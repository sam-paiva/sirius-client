import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../infra/services/auth/authApi';
import { getDecodedToken } from '../../infra/services/auth/authService';

export const logoutAction = createAsyncThunk(
  'users/logout',
  async (_, thunkAPI) => {
    try {
      const response = await userApi.logout();

      if (response.status === 200) {
        window.location.href = '/home';
        window.location.reload();
        return response.data;
      }

      return thunkAPI.rejectWithValue({});
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const loginCallbackAction = createAsyncThunk(
  'users/loginCallback',
  async (navigate: any, thunkAPI) => {
    try {
      const token = getDecodedToken();

      if (token && token.role) {
        navigate('/admin');
        return thunkAPI.fulfillWithValue({});
      }

      navigate('/collect-info');
      return thunkAPI.fulfillWithValue({});
    } catch (error) {
      return thunkAPI.rejectWithValue({});
    }
  }
);

export const addRoleAction = createAsyncThunk("users/add-role", async ({ role, navigate }: any, thunkApi) => {
  try {

    const response = await userApi.addRole(role);

    if (response.status === 204) {
      navigate('/admin')
      return response.data;
    }

    return thunkApi.rejectWithValue({});
  } catch (error) {
    return thunkApi.rejectWithValue({});
  }
})
