import React from 'react';
import { withRouter } from 'react-router-dom';
import { useGet } from '../hooks/useAxios';

const DashboardPage = () => {
  const [blogPostData, isBlogPostDataLoading] = useGet({
    path: '/api/protected/user-blog-posts'
  });

  return (
    <div className="dashboard-page">
      <div>
        <p>goto your blog -></p>
        <p>create new blog post</p>
      </div>
      <hr />
      <div>
        <p>is data loading: {isBlogPostDataLoading.toString()}</p>
        Downloaded user blog posts:
        <ul>
          {!isBlogPostDataLoading &&
            blogPostData.blogPosts.map(blogPost => {
              return (
                <li key={blogPost}>
                  <div>{blogPost}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(DashboardPage);
