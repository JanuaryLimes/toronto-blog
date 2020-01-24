import createSelector from 'selectorator';
// TODO
const getBlogPosts = createSelector(['blogPosts'], blogPosts => {
  return blogPosts;
});

export { getBlogPosts };
