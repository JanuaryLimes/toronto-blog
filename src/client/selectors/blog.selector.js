import createSelector from 'selectorator';

const getBlogs = createSelector(
  ['blogs'],
  blogs => {
    return blogs;
  }
);

export { getBlogs };
