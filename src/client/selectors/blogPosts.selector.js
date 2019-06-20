import createSelector from 'selectorator';

const getBlogPosts = createSelector(
  ['blogPosts'],
  blogPosts => {
    return blogPosts;
  }
);

export { getBlogPosts };
