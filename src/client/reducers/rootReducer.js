import { combineReducers } from 'redux';
import { blogsReducer } from './blogsReducer';
import { authReducer } from './authReducer';
import { blogPostsReducer } from './blogPostsReducer';

export const rootReducer = combineReducers({
  blogs: blogsReducer,
  auth: authReducer,
  blogPosts: blogPostsReducer
});
