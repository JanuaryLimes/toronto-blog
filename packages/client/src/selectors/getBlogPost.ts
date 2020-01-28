import { createSelector } from '@reduxjs/toolkit';
import { RootState, UserBlogPost, BlogPostPageProps } from '../types';

export const getBlogPost = createSelector<
  RootState,
  BlogPostPageProps,
  UserBlogPost | undefined,
  UserBlogPost | undefined
>(
  (state, { blogName, blogPostId }) => {
    return state.blogPosts
      .find(blogPostStateItem => blogPostStateItem.user === blogName)
      ?.userBlogPosts?.find(post => post._id === blogPostId);
  },
  res => res
);
