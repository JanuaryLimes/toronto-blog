import createSelector from 'selectorator';
// TODO
export const getLoggedUser = createSelector(['auth'], auth => {
  return auth.loggedUser;
});
