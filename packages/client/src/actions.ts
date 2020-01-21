import { createAction } from '@reduxjs/toolkit';
import {
  LoginPayload,
  BlogPostStateItem,
  SetBlogPostByIdPayload,
  DeleteBlogPostByIdPayload,
  SetTopBlogsPayload
} from './types';

export const setBlogs = createAction('SET_BLOGS');
export const login = createAction<LoginPayload>('LOGIN');
export const logout = createAction('LOGOUT');
export const setBlogPosts = createAction<BlogPostStateItem>('SET_BLOG_POSTS');
export const setBlogPostById = createAction<SetBlogPostByIdPayload>(
  'SET_BLOG_POST_BY_ID'
);
export const deleteBlogPostById = createAction<DeleteBlogPostByIdPayload>(
  'DELETE_BLOG_POST_BY_ID'
);
export const setTopBlogs = createAction<SetTopBlogsPayload>('SET_TOP_BLOGS');
