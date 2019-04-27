import createSelector from 'selectorator';

export const getBlogs = createSelector(
  ['blogs'],
  blogs => {
    console.log('blogs selector', blogs);
    return blogs;
  }
);
