import createSelector from 'selectorator';

export const getBlogs = createSelector(
  ['blogs'],
  blogs => {
    return blogs;
  }
);
