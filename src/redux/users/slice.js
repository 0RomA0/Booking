// slice.js
import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, fetchBusinessUsers } from './operations';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    businessUsers: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.businessUsers = action.payload;
      })
      .addCase(fetchBusinessUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.businessUsers = state.businessUsers.filter(
          (user) => user._id !== action.payload,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
