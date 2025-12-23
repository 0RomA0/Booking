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
    modal: {
      isOpen: false,
      user: null,
      booking: null,
    },
    loading: false,
    error: null,
  },

  reducers: {
    openBookingModal(state, action) {
      state.modal = {
        isOpen: true,
        user: action.payload,
        booking: null,
      };
    },

    openEditBookingModal(state, action) {
      state.modal = {
        isOpen: true,
        user: action.payload.business,
        booking: action.payload,
      };
    },

    closeBookingModal(state) {
      state.modal = { isOpen: false, user: null, booking: null };
    },
  },

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

export const { openBookingModal, openEditBookingModal, closeBookingModal } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
