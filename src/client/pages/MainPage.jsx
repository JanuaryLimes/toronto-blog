import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBlogs, login } from '../actions';
import { getBlogs } from '../selectors/blog.selector';
import { useCookies } from 'react-cookie';
import { sayDupa } from 'utils';

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

const Main = ({ blogs, dispatchSetBlogs, dispatchLogin }) => {
  const cookies = useCookies();

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
    console.log('dupa dupa', sayDupa());

    getAllBlogs(dispatchSetBlogs);
    const cookie = cookies[0].u;
    if (cookie) {
      dispatchLogin(cookie);
    }
  }, []);

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

const mapStateToProps = state => ({
  blogs: getBlogs(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchSetBlogs: blogs => {
    dispatch(setBlogs({ blogs }));
  },
  dispatchLogin: loggedUser => {
    dispatch(login({ loggedUser }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
