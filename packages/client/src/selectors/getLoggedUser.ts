import { createSelector } from 'reselect';
import { AuthState, RootState } from '../types';

export const getLoggedUser = createSelector<
  RootState,
  AuthState,
  string | undefined
>(
  state => state.auth,
  auth => auth.loggedUser
);
