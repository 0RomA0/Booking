import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMyBookings',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/bookings');
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ userId, date }, thunkAPI) => {
    try {
      const res = await api.post('/bookings', { userId, date });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ bookingId, date }, thunkAPI) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}`, { date });
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (bookingId, thunkAPI) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      return bookingId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
