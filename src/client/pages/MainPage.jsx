import React, { useEffect } from 'react';
import axios from 'axios';
import { useActions, useSelector, useStore } from 'react-redux';
import { setBlogs } from '../actions';
import { getBlogs } from '../selectors/blog.selector';

const Main = () => {
  //const store = useStore();
  const dispatchSetBlogs = useActions(blogs => {
    console.log('use actions', blogs);
    return setBlogs({ blogs });
  }, []);
  const blogs = useSelector(state => {
    console.log('useSelector state', state);
    return getBlogs(state);
  });

  const onGetSecure = e => {
    e.preventDefault();

    axios
      .get('/api/protectedBlogs', { withCredentials: true })
      .then(response => {
        console.log('success', response.data);
      })
      .catch(error => {
        console.log('error', error);
      })
      .then(() => {
        console.groupEnd();
      });
  };

  useEffect(() => {
    //console.log('before get blogs', store.getState());
    axios
      .get('/api/allblogs')
      .then(response => {
        console.log('success', response.data);
        dispatchSetBlogs(response.data);
      })
      .catch(error => {
        console.log('error', error);
      })
      .then(() => {
        console.groupEnd();
      });
    //console.log('after get blogs', store.getState());
  }, [dispatchSetBlogs]);

  // useEffect(() => {
  //   console.log('################', blogs);
  // });

  return (
    <div className="main-page">
      <button onClick={onGetSecure}>get secure</button>
      <div>Login</div>
      <div>Search existing blogs</div>
      <div>
        Blogs:
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>{blog.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
