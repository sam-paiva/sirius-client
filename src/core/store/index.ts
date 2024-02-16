import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { companiesApi } from '../../infra/services/companies/companiesApi';
import bundles from './bundles/bundlesSlice';
import checkout from './checkout/checkoutSlice';
import jobs from './jobs/jobsSlice';
import users from './users/userSlice';

const rootReducer = combineReducers({ [companiesApi.reducerPath]: companiesApi.reducer, users, jobs, bundles, checkout });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(companiesApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
