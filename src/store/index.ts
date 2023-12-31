import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import jobs from './jobs/jobsSlice';
import users from './users/userSlice';

const rootReducer = combineReducers({ users, jobs });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
