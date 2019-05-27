import { createReducer } from 'redux-starter-kit';
import { setBlogPosts } from '../actions';
import lodash from 'lodash';

const setBlogPosts_type = setBlogPosts.type;

const getUniqueList = (list1, list2) => {
  const two = list1.concat(list2);
  return [...lodash.uniq(two)];
};

const blogPostsReducer = createReducer([], {
  [setBlogPosts_type]: (state, action) => {
    const { user, userBlogPosts } = action.payload;
    if (user) {
      const currentUserData = state.find(userData => userData.user === user);
      if (currentUserData) {
        console.log('a');
        currentUserData.userBlogPosts = getUniqueList(
          currentUserData.userBlogPosts,
          userBlogPosts
        );
      } else {
        console.log('b');
        state.push({ user, userBlogPosts });
      }
    }
  }
});

export { blogPostsReducer };
