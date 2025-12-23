import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInUser, logOutUser, refreshUser } from './operations';
const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    pets: [],
    noticesFavorites: [],
    noticesViewed: [],
    loading: false,
    error: null,
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logInUser.pending, handlePending)
      .addCase(logInUser.rejected, handleRejected)
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOutUser.pending, handlePending)
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
