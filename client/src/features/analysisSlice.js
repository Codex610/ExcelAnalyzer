// client/src/features/analysisSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/analysis';

// Save a new analysis
export const saveAnalysis = createAsyncThunk(
  'analysis/saveAnalysis',
  async ({ fileId, xColumn, yColumn, chartType, insights }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(
        API_URL,
        { fileId, xColumn, yColumn, chartType, insights },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // Saved analysis object
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch user's analysis history
export const fetchMyAnalyses = createAsyncThunk(
  'analysis/fetchMyAnalyses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API_URL + '/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data; // Array of analyses with populated file info
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState: {
    analyses: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearAnalysisState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save analysis
      .addCase(saveAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(saveAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.analyses.unshift(action.payload); // add to front
        state.successMessage = 'Analysis saved successfully.';
      })
      .addCase(saveAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Analysis save failed.';
      })

      // Fetch analyses
      .addCase(fetchMyAnalyses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAnalyses.fulfilled, (state, action) => {
        state.loading = false;
        state.analyses = action.payload;
      })
      .addCase(fetchMyAnalyses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch analyses.';
      });
  },
});

export const { clearAnalysisState } = analysisSlice.actions;

export default analysisSlice.reducer;