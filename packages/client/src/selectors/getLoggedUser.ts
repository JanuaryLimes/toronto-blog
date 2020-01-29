import { createSelector } from '@reduxjs/toolkit';
import { AuthState, RootState } from '../types';

export const getLoggedUser = createSelector<
  RootState,
  AuthState,
  string | undefined
>(
  state => state.auth,
  auth => auth.loggedUser
);
