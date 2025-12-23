import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import usersReducer from './users/slice';
import bookingsReducer from './bookings/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: usersReducer,
    bookings: bookingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
