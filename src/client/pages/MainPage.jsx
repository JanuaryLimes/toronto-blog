import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBlogs } from '../actions';
import { getBlogs } from '../selectors/blog.selector';
import { withRouter } from 'react-router-dom';

class MainComponent extends Component {
  componentDidMount() {
    axios
      .get('/api/allblogs')
      .then(response => {
        console.log('success', response.data);
        this.props.dispatchSetBlogs(response.data);
      })
      .catch(error => {
        console.log('error', error);
      })
      .then(() => {
        console.groupEnd();
      });
  }

  onGetSecure = e => {
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

  render() {
    return (
      <div className="main-page">
        <button onClick={e => this.onGetSecure(e)}>get secure</button>
        <div>Login</div>
        <div>Search existing blogs</div>
        <div>
          Blogs:
          <ul>
            {this.props.blogs.map(blog => (
              <li key={blog._id}>{blog.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blogs: getBlogs(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchSetBlogs: blogs => {
    dispatch(setBlogs({ blogs }));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainComponent)
);
