import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBlogs } from '../actions';
import { getBlogs } from '../selectors/blog.selector';

const Main = ({ blogs, dispatchSetBlogs }) => {
  useEffect(() => {
    console.group('fetch data');
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
  }, []);
  return (
    <div>
      <div>Create New Blog</div>
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

const mapStateToProps = state => ({
  blogs: getBlogs(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchSetBlogs: blogs => {
    dispatch(setBlogs({ blogs }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
