import { createSlice } from '@reduxjs/toolkit';
import { Job } from '../../core/models/job';
import { Problem } from '../../core/models/problem';
import { addJobAction } from './jobsActions';

interface State {
  isLoading: boolean;
  userJobs: Job[];
  createJobsProblems: Problem[];
}

const initialState: State = {
  isLoading: false,
  userJobs: [],
  createJobsProblems: []
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addJobAction.pending, (state) => {
      state.isLoading = true;
      state.createJobsProblems = [];
    });

    builder.addCase(addJobAction.rejected, (state, action) => {
      state.isLoading = false;
      state.createJobsProblems = action.payload as Problem[];
    });

    builder.addCase(addJobAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userJobs.push(action.payload);
    });
  }
});

export const {} = jobsSlice.actions;

export default jobsSlice.reducer;
