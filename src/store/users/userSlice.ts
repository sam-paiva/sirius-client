import { createSlice } from '@reduxjs/toolkit';
import { checkifUserIsAuthenticated } from '../../infra/services/auth/authService';
import { addRoleAction, loginCallbackAction, logoutAction } from './usersActions';

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: State = {
  isLoading: false,
  isAuthenticated: checkifUserIsAuthenticated() ? true : false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccessAction(state) {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logoutAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });

    builder.addCase(loginCallbackAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginCallbackAction.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    });

    builder.addCase(loginCallbackAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    });


    builder.addCase(addRoleAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addRoleAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addRoleAction.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { loginSuccessAction } = usersSlice.actions;

export default usersSlice.reducer;
