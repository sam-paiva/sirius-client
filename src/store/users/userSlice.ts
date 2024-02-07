import { createSlice } from '@reduxjs/toolkit';
import { checkifUserIsAuthenticated } from '../../infra/services/auth/authService';
import { createCompanyAction, getUserBundlesAction, loginCallbackAction, logoutAction } from './usersActions';

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  userBundles: UserBundle[];
}

const initialState: State = {
  isLoading: false,
  isAuthenticated: checkifUserIsAuthenticated() ? true : false,
  userBundles: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccessAction(state) {
      state.isAuthenticated = true;
    },
    updateBundlesAfterPayment: (state, action) => {
      state.userBundles.push(action.payload);
    }
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

    builder.addCase(getUserBundlesAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserBundlesAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserBundlesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userBundles = action.payload;
    });

    builder.addCase(createCompanyAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createCompanyAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createCompanyAction.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { loginSuccessAction, updateBundlesAfterPayment } = usersSlice.actions;

export default usersSlice.reducer;
