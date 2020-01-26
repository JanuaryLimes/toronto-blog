import { createReducer } from '@reduxjs/toolkit';
import { login, logout } from '../actions';
import { AuthState } from '../types';

const initialState: AuthState = { loggedUser: undefined };

export const authReducer = createReducer(initialState, builder =>
  builder
    .addCase(login, (state, action) => {
      state.loggedUser = action.payload.loggedUser;
    })
    .addCase(logout, (state, _action) => {
      state.loggedUser = undefined;
    })
);
