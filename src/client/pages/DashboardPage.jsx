import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useGet } from '../hooks/useAxios';
import { useSelector, useDispatch } from 'react-redux';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { getBlogPosts } from '../selectors/blogPosts.selector';
import { setBlogPosts } from '../actions';
import PrivateRoute from '../components/PrivateRoute';

const CreateNewBlogPost = () => {
  return (
    <div style={{ border: '1px solid white', padding: '1rem' }}>create new</div>
  );
};

const DashboardPage = ({ match, location }) => {
  const loggedUser = useLoggedUser();
  const dispatch = useDispatch();
  const [blogPostData, isBlogPostDataLoading] = useGet({
    path: '/api/protected/user-blog-posts'
  });
  const userBlogPosts = useSelector(
    state => {
      const blogPosts = getBlogPosts(state).find(
        blogPost => blogPost.user === loggedUser
      );

      if (blogPosts) {
        return blogPosts;
      } else {
        return [];
      }
    },
    [loggedUser, blogPostData]
  );

  useEffect(() => {
    console.log('match', match);
    console.log('location', location);
  }, [match, location]);

  useEffect(() => {
    console.log('userBlogPosts', userBlogPosts);
  }, [userBlogPosts]);

  useEffect(() => {
    console.log('blogPostData', blogPostData);
    dispatch(setBlogPosts({ ...blogPostData }));
  }, [blogPostData, dispatch]);

  return (
    <div className="dashboard-page">
      <div>
        <p>goto your blog -></p>
        {location.pathname !== match.url + '/create-new-blog-post' && (
          <Link to={match.url + '/create-new-blog-post'}>
            <button className="btn bg-primary">Create new blog post</button>
          </Link>
        )}
        <PrivateRoute
          path={match.url + '/create-new-blog-post'}
          component={CreateNewBlogPost}
        />
      </div>
      <hr />
      <div>
        <p>is data loading: {isBlogPostDataLoading.toString()}</p>
        Downloaded user blog posts:
        <ul>
          {!isBlogPostDataLoading &&
            blogPostData.userBlogPosts.map(blogPost => {
              return (
                <li key={blogPost}>
                  <div>{blogPost}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(DashboardPage);
