import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { usePost } from '../hooks/useAxios';
import { useLoggedUser } from '../hooks/useLoggedUser';
import PrivateRoute from '../components/PrivateRoute';

const CreateNewBlogPost = () => {
  const loggedUser = useLoggedUser();
  const [postArgs, setPostArgs] = useState({});
  const { isLoading, error } = usePost(postArgs);
  const [title, setTitle] = useState('Title');
  const [content, setContent] = useState('Content');

  useEffect(() => {
    var c = isLoading + error; // todo make post in progress indicator, display error if any
    c = '';
    console.log(c);
  }, [isLoading, error]);

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

  function render() {
    return (
      <div className="dashboard-page">
        <div>
          <Link to={'/' + loggedUser}>
            <button>go to your blog -></button>
          </Link>
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
      </div>
    );
  }

  return render();
});
