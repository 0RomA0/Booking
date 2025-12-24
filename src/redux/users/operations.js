import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchBusinessUsers = createAsyncThunk(
  'users/fetchBusinessUsers',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/users/business');
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, thunkAPI) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId; // повертаємо id для видалення з state
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  },
);
