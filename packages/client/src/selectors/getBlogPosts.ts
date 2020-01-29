import { createSelector } from '@reduxjs/toolkit';
import { RootState, BlogPostStateItem, UserBlogPost } from '../types';

export const getBlogPosts = createSelector<
  RootState,
  string,
  BlogPostStateItem | undefined,
  UserBlogPost[] | undefined
>(
  (state, blogName) =>
    state.blogPosts.find(
      blogPostStateItem => blogPostStateItem.user === blogName
    ),
  blogPostStateItem => blogPostStateItem?.userBlogPosts
);
