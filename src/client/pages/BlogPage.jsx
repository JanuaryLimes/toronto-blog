import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import * as moment from 'moment';
import { setBlogPosts } from 'client/actions';
import { getBlogPosts } from 'client/selectors/blogPosts.selector';
import { useGet } from 'client/hooks/useAxios';
import { Link, withRouter } from 'react-router-dom';

const BlogPage = withRouter(function({ blogName, match }) {
  const dispatch = useDispatch();
  const userBlogPosts = useSelector(
    state => {
      const blogPosts = getBlogPosts(state).find(
        blogPost => blogPost.user === blogName
      );

      if (blogPosts && blogPosts.userBlogPosts) {
        return blogPosts.userBlogPosts;
      } else {
        return null;
      }
    },
    [blogName]
  );

  const mOnSuccess = useMemo(
    () => data => {
      dispatch(setBlogPosts({ ...data }));
    },
    [dispatch]
  );

  const { isLoading: isBlogPostDataLoading } = useGet({
    path: '/api/public/blogs/' + blogName,
    onSuccess: mOnSuccess
  });

  function getBlogPostTemplate(blogPost) {
    const date = new Date(blogPost.postDate);
    const createdFromNow = moment(date).fromNow();

    function getBlogPostLink() {
      let url = match.url;
      const lastChar = match.url.slice(-1);
      if (lastChar === '/') {
        url = url.slice(0, -1);
      }

      return url + '/' + blogPost._id;
    }

    return (
      <div className="blog-item border-2 p-4 rounded">
        <p>Created: {createdFromNow}</p>
        <div className="font-bold text-2xl pb-6 underline">
          <Link to={getBlogPostLink()}>{blogPost.title}</Link>
        </div>
        <div className="mde-preview">
          <div className="mde-preview-content">
            <ReactMarkdown source={blogPost.content} />
          </div>
        </div>
      </div>
    );
  }

  function displayUserBlogPosts() {
    if (isBlogPostDataLoading || !userBlogPosts) {
      return '';
    }
    return (
      <ul>
        {userBlogPosts.map(blogPost => {
          return (
            <li key={blogPost._id} className="pt-2">
              {getBlogPostTemplate(blogPost)}
            </li>
          );
        })}
      </ul>
    );
  }
  function render() {
    return (
      <>
        <div>{blogName}</div>
        <div>
          <hr />
          <div>
            <p>is data loading: {isBlogPostDataLoading.toString()}</p>
            Downloaded user blog posts:
            {displayUserBlogPosts()}
          </div>
        </div>
      </>
    );
  }

  return render();
});

export { BlogPage };
