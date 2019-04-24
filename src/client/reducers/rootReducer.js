import { combineReducers } from 'redux';
import { blogsReducer } from './blogsReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  blogs: blogsReducer,
  auth: authReducer
});
