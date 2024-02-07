import { createSlice } from '@reduxjs/toolkit';
import { ContractTypes } from '../../core/enums/contractTypes';
import { PositionLevels } from '../../core/enums/positionLevels';
import { Job } from '../../core/models/job';
import { Problem } from '../../core/models/problem';
import { addJobAction, getJobByIdAction, getJobsAction, getJobsByUserAction } from './jobsActions';

interface PreSavedJob {
  jobTitle: string;
  jobDescription: string;
  tags?: string[];
  budget?: string;
  country: string;
  city: string;
  contractType: ContractTypes;
  positionLevels: PositionLevels;
  companyName?: string;
  positionUrl: string;
  companyWebsite: string | null;
  companyLogo: string | null;
  userBundleId: string;
}

interface State {
  isLoading: boolean;
  userJobs: Job[];
  jobs: Job[];
  createJobsProblems: Problem[];
  selectedJob: Job | null;
  preSavedJob: PreSavedJob | null;
}

const initialState: State = {
  isLoading: false,
  userJobs: [],
  createJobsProblems: [],
  jobs: [],
  selectedJob: null,
  preSavedJob: null
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    preSaveJobAction: (state, action) => {
      state.preSavedJob = action.payload;
    }
  },
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

    builder.addCase(getJobsByUserAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getJobsByUserAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getJobsByUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userJobs = action.payload;
    });

    builder.addCase(getJobsAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getJobsAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getJobsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    });

    builder.addCase(getJobByIdAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getJobByIdAction.rejected, (state) => {
      state.isLoading = false;
      state.selectedJob = null;
    });

    builder.addCase(getJobByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedJob = action.payload ?? null;
    });
  }
});

export const { preSaveJobAction } = jobsSlice.actions;

export default jobsSlice.reducer;
