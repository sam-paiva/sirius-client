import { createSlice } from '@reduxjs/toolkit';
import { Bundle } from '../../core/models/bundle';

interface State {
  isLoading: boolean;
  selectedBundle: Bundle | null;
}

const initialState: State = {
  isLoading: false,
  selectedBundle: null
};

export const checkoutSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    selectBundleAction: (state, action) => {
      state.selectedBundle = action.payload;
    }
  }
});

export const { selectBundleAction } = checkoutSlice.actions;

export default checkoutSlice.reducer;
