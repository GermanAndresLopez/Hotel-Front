import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    status: 'checking', // checking, not-authenticated, authenticated
    user: null,
    errorMessage: null,
    rol:null,
  },

  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
      state.rol = payload.rol;
    },

    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
      state.rol = null; 
    }
    
  },
});

export const { onLogin, onLogout } = authSlice.actions;
