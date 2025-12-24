import { createSlice } from '@reduxjs/toolkit';
import {
  createBooking,
  deleteBooking,
  fetchMyBookings,
  updateBooking,
} from './operations';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      .addCase(createBooking.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.list.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (booking) => booking._id !== action.payload,
        );
      });
  },
});

export default bookingsSlice.reducer;
