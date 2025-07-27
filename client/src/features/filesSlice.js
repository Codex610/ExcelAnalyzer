// client/src/features/filesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/files';

// Async thunk to upload a file
export const uploadFile = createAsyncThunk(
  'files/uploadFile',
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(API_URL + '/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data; // expect {fileId, data}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Async thunk to fetch files uploaded by user
export const fetchMyFiles = createAsyncThunk(
  'files/fetchMyFiles',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API_URL + '/myfiles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // array of files
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    uploadedData: null, // Holds parsed data from latest upload
    uploadedFileId: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearFilesState(state) {
      state.uploadedData = null;
      state.uploadedFileId = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload file
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFileId = action.payload.fileId;
        state.uploadedData = action.payload.data;
        state.successMessage = 'File uploaded and parsed successfully.';
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'File upload failed.';
      })

      // Fetch user files
      .addCase(fetchMyFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchMyFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch files.';
      });
  },
});

export const { clearFilesState } = filesSlice.actions;

export default filesSlice.reducer;