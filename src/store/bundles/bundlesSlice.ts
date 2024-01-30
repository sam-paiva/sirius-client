import { createSlice } from '@reduxjs/toolkit';
import { Bundle } from '../../core/models/bundle';
import { getBundlesAction } from './bundlesActions';

interface State {
  isLoading: boolean;
  bundles: Bundle[];
}

const initialState: State = {
  isLoading: false,
  bundles: []
};

export const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBundlesAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBundlesAction.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getBundlesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bundles = action.payload;
    });
  }
});

export default bundlesSlice.reducer;
