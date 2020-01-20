import React, { useState } from 'react';
import { useGet } from '../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBlogs } from '../actions';
import { Link } from 'react-router-dom';

const MainComponent = () => {
  const dispatch = useDispatch();
  const [topBlogsArgs] = useState({
    path: '/api/public/top-blogs/10',
    onSuccess: result => {
      // console.log('result: ', result);
      dispatch(setTopBlogs({ topBlogs: result.topBlogs /* */ }));
    },
    onError: error => {
      console.log('error: ', error);
    }
  });
  /* const { isLoading, data, error } = */ useGet(topBlogsArgs);
  const topBlogs = useSelector(state => {
    return state?.topBlogs;
  });

  function render() {
    return (
      <div className="">
        {!topBlogs?.length ? (
          <div className="flex justify-center">
            Go ahead and create your own blog
          </div>
        ) : (
          <>
            <div className="text-xl">Top blogs</div>
            <ul className="list-disc pl-6">
              {topBlogs?.map(item => {
                return (
                  <li key={item._id}>
                    {item.blogName}{' '}
                    <Link
                      to={`/blog/${item.blogName}`}
                      className="text-blue-500 hover:underline"
                    >
                      view
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }

  return render();
};

export default MainComponent;
