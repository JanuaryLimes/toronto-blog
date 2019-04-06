import { createReducer } from 'redux-starter-kit';
import { setBlogs } from '../actions';

export const blogsReducer = createReducer([], {
  [setBlogs.type]: (_state, action) => {
    return [...action.payload.blogs];
  }
});
