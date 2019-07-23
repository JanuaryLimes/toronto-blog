import React, { useMemo } from 'react';
import { useGet } from '../hooks/useAxios';
import { setBlogPosts } from '../actions';
import { getBlogPosts } from '../selectors/blogPosts.selector';
import ReactMarkdown from 'react-markdown';
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
      console.log('data:', data);
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
              <div className="blog-item border-2 p-4 rounded">
                <div className="font-bold text-2xl pb-6 underline">
                  {blogPost.title}
                </div>
                <div className="mde-preview">
                  <div className="mde-preview-content">
                    <ReactMarkdown source={blogPost.content} />
                  </div>
                </div>
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
