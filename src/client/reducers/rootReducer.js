import { combineReducers } from 'redux';
import { blogsReducer } from './blogsReducer';

export const rootReducer = combineReducers({ blogs: blogsReducer });
