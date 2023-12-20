import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../infra/services/authApi';
import { getDecodedToken } from '../../infra/services/authService';

export const logoutAction = createAsyncThunk(
  'users/logout',
  async (_, thunkAPI) => {
    try {
      const response = await userApi.logout();

      if (response.status === 200) return response.data;

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

      if (token && token.roles) {
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
