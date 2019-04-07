import { createReducer } from 'redux-starter-kit';
import { setBlogs } from '../actions';

export const blogsReducer = createReducer([], {
  [setBlogs.type]: (_state, action) => {
    const revertedBlogs = action.payload.blogs.reverse();
    return [...revertedBlogs];
  }
});
