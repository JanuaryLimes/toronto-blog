import { createReducer } from 'redux-starter-kit';
import { setBlogPosts } from '../actions';

const setBlogPosts_type = setBlogPosts.type;

const blogPostsReducer = createReducer([], {
  [setBlogPosts_type]: (state, action) => {
    const { user, userBlogPosts } = action.payload;

    if (user) {
      const currentUserData = state.find(userData => userData.user === user);
      if (currentUserData) {
        var existingIds = currentUserData.userBlogPosts.map(a => a._id);
        var newIds = userBlogPosts
          .map(a => a._id)
          .filter(b => !existingIds.includes(b));
        var newPosts = userBlogPosts.filter(a => newIds.includes(a._id));
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

        var result = [...newPosts, ...currentUserData.userBlogPosts];
        currentUserData.userBlogPosts = result;
      } else {
        state.push({ user, userBlogPosts });
      }
    }
  }
});

export { blogPostsReducer };
