import { createAction } from '@reduxjs/toolkit';

const setBlogs = createAction('SET_BLOGS');
const login = createAction('LOGIN');
const logout = createAction('LOGOUT');
const setBlogPosts = createAction('SET_BLOG_POSTS');
const setBlogPostById = createAction('SET_BLOG_POST_BY_ID');

export { setBlogs, login, logout, setBlogPosts, setBlogPostById };
