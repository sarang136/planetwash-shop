// src/app/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './appSlice'; 
import authReducer from './AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // fixed name, use "auth" as the key
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
