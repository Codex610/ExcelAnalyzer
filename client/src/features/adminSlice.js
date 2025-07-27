// client/src/features/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/admin';

// Fetch usage statistics (users, files, analyses count)
export const fetchStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API_URL + '/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // { userCount, fileCount, analysisCount }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch all users for admin to manage
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(API_URL + '/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // array of users
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Delete user by admin
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {},
    users: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearAdminState(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch statistics.';
      })

      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users.';
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.successMessage = 'User deleted successfully.';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete user.';
      });
  },
});

export const { clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;