import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    status: 'checking', // checking, not-authenticated, authenticated
    user: null,
    errorMessage: null,
  },

  reducers: {
    chekingCredentials: (state) => {
      state.status = 'checking';
    },

    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },

    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = payload;
    },
  },
});

export const { chekingCredentials, onLogin, onLogout } = authSlice.actions;
