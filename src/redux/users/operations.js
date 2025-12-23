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
