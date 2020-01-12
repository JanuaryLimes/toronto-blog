import { createReducer } from '@reduxjs/toolkit';
import { setTopBlogs } from '../actions';

const setTopBlogs_type = setTopBlogs.type;

const topBlogsReducer = createReducer([], {
  [setTopBlogs_type]: (_state, action) => {
    return action.payload.topBlogs;
  }
});

export { topBlogsReducer };
