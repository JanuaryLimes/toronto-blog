import { createReducer } from '@reduxjs/toolkit';
import { setTopBlogs } from '../actions';
import { TopBlogsState } from '../types';

const initialState: TopBlogsState = [];

const topBlogsReducer = createReducer(initialState, builder =>
  builder.addCase(setTopBlogs, (_state, action) => {
    return action.payload.topBlogs;
  })
);

export { topBlogsReducer };
