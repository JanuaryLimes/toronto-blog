import { createAction } from '@reduxjs/toolkit';

export const setBlogs = createAction('SET_BLOGS');
export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');
export const setBlogPosts = createAction('SET_BLOG_POSTS');
export const setBlogPostById = createAction('SET_BLOG_POST_BY_ID');
export const deleteBlogPostById = createAction('DELETE_BLOG_POST_BY_ID');
export const setTopBlogs = createAction('SET_TOP_BLOGS');
