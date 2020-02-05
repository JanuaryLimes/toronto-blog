import { useState, useMemo } from 'react';
import { useGet } from '../useAxios';
import { useDispatch } from 'react-redux';
import { setTopBlogs } from '../../actions';
import { getTopBlogs } from '../../selectors/getTopBlogs';
import { useSelector } from '../useSelector';

export function useMainPageState() {
  const dispatch = useDispatch();
  const [topBlogsArgs] = useState({
    path: '/api/public/top-blogs/10',
    onSuccess: (result: { topBlogs: any }) => {
      // console.log('result: ', result);
      dispatch(setTopBlogs({ topBlogs: result.topBlogs /* */ }));
    },
    onError: (error: any) => {
      console.log('error: ', error);
    }
  });
  /* const { isLoading, data, error } = */ useGet(topBlogsArgs);
  const getTopBlogsMemo = useMemo(() => getTopBlogs, []);
  const topBlogs = useSelector(getTopBlogsMemo);

  return {
    topBlogs
  };
}
