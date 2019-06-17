import React, { useEffect, useState, useMemo } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useGet, usePost } from '../hooks/useAxios';
import { useSelector, useDispatch } from 'react-redux';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { getBlogPosts } from '../selectors/blogPosts.selector';
import { setBlogPosts } from '../actions';
import PrivateRoute from '../components/PrivateRoute';

const CreateNewBlogPost = () => {
  const loggedUser = useLoggedUser();
  const [postArgs, setPostArgs] = useState({});
  const { isLoading, error } = usePost(postArgs);
  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Content');

  function addPost() {
    setPostArgs({
      path: '/api/secure/dashboard/create-new-blog-post',
      body: {
        title: title,
        content: content,
        blogName: loggedUser,
        postDate: Date.now()
      },
      onSuccess: () => {
        console.log('post success');
      }
    });
  }

  return (
    <div style={{ border: '1px solid white', padding: '1rem' }}>
      <label>Title</label>{' '}
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <br />
      <label>Content</label>
      <br />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <br />
      <button onClick={addPost}>Add post</button>
    </div>
  );
};

export default withRouter(function DashboardPage({ match, location }) {
  const loggedUser = useLoggedUser();
  const dispatch = useDispatch();

  const mOnSuccess = useMemo(
    () => data => dispatch(setBlogPosts({ ...data })),
    [dispatch]
  );

  const { isLoading: isBlogPostDataLoading } = useGet({
    path: '/api/secure/dashboard/user-blog-posts',
    onSuccess: mOnSuccess
  });
  const userBlogPosts = useSelector(
    state => {
      const blogPosts = getBlogPosts(state).find(
        blogPost => blogPost.user === loggedUser
      );

      if (blogPosts && blogPosts.userBlogPosts) {
        return blogPosts.userBlogPosts;
      } else {
        return null;
      }
    },
    [loggedUser]
  );

  useEffect(() => {
    console.log('match', match);
    console.log('location', location);
  }, [match, location]);

  useEffect(() => {
    console.log('userBlogPosts', userBlogPosts);
  }, [userBlogPosts]);

  function displayUserBlogPosts() {
    if (isBlogPostDataLoading || !userBlogPosts) {
      return '';
    }
    return (
      <ul>
        {userBlogPosts.map(blogPost => {
          return (
            <li key={blogPost}>
              <div>{blogPost}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  function render() {
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
          {displayUserBlogPosts()}
        </div>
      </div>
    );
  }

  return render();
});
