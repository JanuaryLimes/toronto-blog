import { createReducer } from '@reduxjs/toolkit';
import { setBlogPosts } from '../actions';

const setBlogPosts_type = setBlogPosts.type;

const blogPostsReducer = createReducer([], {
  [setBlogPosts_type]: (state, action) => {
    const { user, userBlogPosts } = action.payload;

    if (user) {
      const currentUserData = state.find(userData => userData.user === user);
      if (currentUserData) {
        const existingIds = currentUserData.userBlogPosts.map(a => a._id);
        const newIds = userBlogPosts
          .map(a => a._id)
          .filter(b => !existingIds.includes(b));
        const newPosts = userBlogPosts.filter(a => newIds.includes(a._id));
        newPosts.sort((a, b) => {
          if (a.postDate && b.postDate) {
            if (a.postDate < b.postDate) {
              return 1;
            }
            if (a.postDate > b.postDate) {
              return -1;
            }
          }
          return 0;
        });

        const result = [...newPosts, ...currentUserData.userBlogPosts];
        currentUserData.userBlogPosts = result;
      } else {
        state.push({ user, userBlogPosts });
      }
    }
  }
});

export { blogPostsReducer };
