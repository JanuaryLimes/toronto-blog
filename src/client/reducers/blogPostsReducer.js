import { createReducer } from 'redux-starter-kit';
import { setBlogPosts } from '../actions';

const setBlogPosts_type = setBlogPosts.type;

const blogPostsReducer = createReducer([], {
  [setBlogPosts_type]: (state, action) => {
    const { user, userBlogPosts } = action.payload;
    if (user) {
      const currentUserData = state.find(userData => userData.user === user);
      if (currentUserData) {
        console.log('a');
        var existingIds = currentUserData.userBlogPosts.map(a => a._id);
        var newIds = userBlogPosts
          .map(a => a._id)
          .filter(b => !existingIds.includes(b));
        var newPosts = userBlogPosts.filter(a => newIds.includes(a._id));

        currentUserData.userBlogPosts.push(...newPosts);
      } else {
        console.log('b');
        state.push({ user, userBlogPosts });
      }
    }
  }
});

export { blogPostsReducer };
