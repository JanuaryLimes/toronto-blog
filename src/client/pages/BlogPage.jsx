import React, { useMemo } from 'react';
import { useGet } from '../hooks/useAxios';
import { setBlogPosts } from '../actions';
import { getBlogPosts } from '../selectors/blogPosts.selector';

import { useSelector, useDispatch } from 'react-redux';

const BlogPage = ({ match }) => {
  const { blogName } = match.params;

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
      console.log('data: ', data);
      dispatch(setBlogPosts({ ...data }));
    },
    [dispatch]
  );

  const { isLoading: isBlogPostDataLoading } = useGet({
    path: '/api/public/blogs/' + blogName,
    onSuccess: mOnSuccess
  });

  function displayUserBlogPosts() {
    if (isBlogPostDataLoading || !userBlogPosts) {
      return '';
    }
    return (
      <ul>
        {userBlogPosts.map(blogPost => {
          return (
            <li key={blogPost._id} className="pt-2">
              <div style={{ border: '1px solid black', padding: '1rem' }}>
                <div style={{ fontWeight: 'bold' }}>{blogPost.title}</div>
                <pre className="whitespace-pre-wrap font-sans">
                  {blogPost.content}
                </pre>
              </div>
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
};

export default BlogPage;
