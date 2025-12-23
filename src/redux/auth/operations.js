import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';
import { jwtDecode } from 'jwt-decode';

const setAuthHeader = (values) => {
  api.defaults.headers.common.Authorization = values;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (values, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', values);
      const { token, user } = res.data.data || {};
      setAuthHeader(`Bearer ${token}`);
      return { token, user };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logInUser = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', values);
      const { token, user } = res.data.data;
      setAuthHeader(`Bearer ${token}`);
      return { token, user };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      api.defaults.headers.common.Authorization = '';
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue('No token');

    setAuthHeader(`Bearer ${token}`);

    try {
      const { id } = jwtDecode(token);
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  },
);
