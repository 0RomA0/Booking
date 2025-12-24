import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMyBookings',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/booking/my');
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ businessId, date }, thunkAPI) => {
    try {
      const res = await api.post('/booking', { business: businessId, date });
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  },
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ bookingId, date }, thunkAPI) => {
    try {
      const res = await api.patch(`/booking/${bookingId}`, { date });
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
      await api.delete(`/booking/${bookingId}`);
      return bookingId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
