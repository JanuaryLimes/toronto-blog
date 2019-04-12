import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBlogs } from '../actions';
import { getBlogs } from '../selectors/blog.selector';

const getAllBlogs = onSuccess => {
  console.group('fetch data');
  axios
    .get('/api/allblogs')
    .then(response => {
      console.log('success', response.data);
      onSuccess(response.data);
    })
    .catch(error => {
      console.log('error', error);
    })
    .then(() => {
      console.groupEnd();
    });
};

const Main = ({ blogs, dispatchSetBlogs }) => {
  const [blogName, setBlogName] = useState('');

  const onRegister = e => {
    e.preventDefault();

    axios
      .post('/api/register', {
        username: 'abcdef',
        password: 'dupa123'
      })
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
        console.log(error.response.data);
      });
  };
  const onLogin = e => {
    e.preventDefault();

    axios
      .post(
        '/api/login',
        {
          username: 'abcdef',
          password: 'dupa123'
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
        console.log(error.response.data);
      });
  };

  const onCreate = e => {
    e.preventDefault();

    if (blogName) {
      console.log('creating...', blogName);
      axios
        .post('/api/blog', {
          name: blogName
        })
        .then(response => {
          console.log('response', response);
          setBlogName('');
          getAllBlogs(dispatchSetBlogs);
        })
        .catch(error => {
          console.log('error', error);
          console.log(error.response.data);
        });
    }
  };

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
    getAllBlogs(dispatchSetBlogs);
  }, []);

  return (
    <div className="main-page">
      <form>
        <label>Name:</label>
        <input value={blogName} onChange={e => setBlogName(e.target.value)} />
        <button type="submit" onClick={onCreate}>
          Create
        </button>
        <button onClick={onRegister}>Register</button>
        <button onClick={onLogin}>Login</button>{' '}
        <button onClick={onGetSecure}>get secure</button>
      </form>
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
