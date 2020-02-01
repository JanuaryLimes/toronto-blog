import React from 'react';
import { Link } from 'react-router-dom';
import { useMainPageState } from '../hooks/state/useMainPageState';

export const MainPage = () => {
  const { topBlogs } = useMainPageState();

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
