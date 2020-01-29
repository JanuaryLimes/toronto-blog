import { createSelector } from '@reduxjs/toolkit';
import { RootState, TopBlogsState } from '../types';

export const getTopBlogs = createSelector<
  RootState,
  TopBlogsState,
  TopBlogsState
>(
  state => state.topBlogs,
  topBlogs => topBlogs
);
