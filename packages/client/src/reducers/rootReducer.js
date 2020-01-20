import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { blogPostsReducer } from './blogPostsReducer';
import { topBlogsReducer } from './topBlogsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  blogPosts: blogPostsReducer,
  topBlogs: topBlogsReducer
});
