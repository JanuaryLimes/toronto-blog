import createSelector from 'selectorator';
// TODO
const getBlogs = createSelector(['blogs'], blogs => {
  return blogs;
});

export { getBlogs };
