import createSelector from 'selectorator';

export const getLoggedUser = createSelector(
  ['auth'],
  auth => {
    return auth.loggedUser;
  }
);
