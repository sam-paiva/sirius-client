import { createSlice } from '@reduxjs/toolkit';
import { checkifUserIsAuthenticated } from '../../../infra/services/auth/authService';
import { getCookieConsent } from '../../../infra/services/localStorage/localStorage';
import { PaginateResult } from '../../models/paginateResult';
import { createCompanyAction, getUserBundlesAction, loginCallbackAction, logoutAction } from './usersActions';

interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  userBundles: PaginateResult<UserBundle> | null;
  cookiesConsent: boolean;
}

const initialState: State = {
  isLoading: false,
  isAuthenticated: checkifUserIsAuthenticated() ? true : false,
  userBundles: null,
  cookiesConsent: getCookieConsent()
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccessAction(state) {
      state.isAuthenticated = true;
    },
    updateBundlesAfterPayment: (state, action) => {
      state.userBundles?.items.push(action.payload);
    },
    setCookieConsent: (state, action) => {
      state.cookiesConsent = action.payload;
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

    builder.addCase(createCompanyAction.fulfilled, (state, _) => {
      state.isLoading = false;
    });
  }
});

export const { loginSuccessAction, updateBundlesAfterPayment, setCookieConsent } = usersSlice.actions;

export default usersSlice.reducer;
