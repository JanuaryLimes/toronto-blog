import { createReducer } from '@reduxjs/toolkit';
import { setBlogPosts, setBlogPostById, deleteBlogPostById } from '../actions';
import { BlogPostsState } from '../types';

const initialState: BlogPostsState = [];

const blogPostsReducer = createReducer(initialState, builder =>
  builder
    .addCase(setBlogPosts, (state, action) => {
      const { user, userBlogPosts } = action.payload;
      if (user) {
        const currentUserData = state.find(userData => userData.user === user);
        if (currentUserData) {
          currentUserData.userBlogPosts = userBlogPosts;
        } else {
          state.push({ user, userBlogPosts });
        }
      }
    })
    .addCase(setBlogPostById, (state, action) => {
      const { id, blogPost } = action.payload;
      const currentUserData = state.find(
        userData => userData.user === blogPost.blogName
      );
      if (currentUserData && currentUserData.userBlogPosts) {
        const idIndex = currentUserData.userBlogPosts.findIndex(
          post => post._id === id
        );
        if (idIndex >= 0) {
          currentUserData.userBlogPosts[idIndex] = blogPost;
        }
      }
    })
    .addCase(deleteBlogPostById, (state, action) => {
      const { id, blogName } = action.payload;
      const currentUserData = state.find(
        userData => userData.user === blogName
      );
      if (currentUserData && currentUserData.userBlogPosts) {
        currentUserData.userBlogPosts = currentUserData.userBlogPosts.filter(
          post => post._id !== id
        );
      }
    })
);

export { blogPostsReducer };
