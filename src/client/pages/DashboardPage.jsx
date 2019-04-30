import React from 'react';
import { withRouter } from 'react-router-dom';

const DashboardPage = () => {
  const userBlogs = ['aaaa', 'bbbb', 'ccccc'];

  return (
    <div className="dashboard-page">
      User blogs:
      <ul>
        {userBlogs.map(blog => {
          return (
            <li key={blog}>
              <div>{blog}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default withRouter(DashboardPage);
