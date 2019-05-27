import { createReducer } from 'redux-starter-kit';
import { setBlogs } from '../actions';

const setBlogs_type = setBlogs.type;

const blogsReducer = createReducer([], {
  [setBlogs_type]: (_state, action) => {
    const revertedBlogs = action.payload.blogs.reverse();
    return [...revertedBlogs];
  }
});

export { blogsReducer };
