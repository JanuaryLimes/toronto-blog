import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = _props => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log('fetch');
    axios
      .get('/api/allblogs')
      .then(response => {
        console.log('success', response.data);
        setBlogs(response.data);
      })
      .catch(error => {
        console.log('error');
        console.log(error);
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

export default App;
