import { useMemo, useState } from 'react';
import { getBlogPosts } from '../../selectors/getBlogPosts';
import { RestCallProps } from '../../types';
import { setBlogPosts } from '../../actions';
import { useGet } from '../useAxios';
import { useDispatch } from 'react-redux';
import { useSelector } from '../useSelector';

export function useBlogPageState(blogName: string) {
  const dispatch = useDispatch();
  const getBlogPostsMemo = useMemo(() => getBlogPosts, []);
  const userBlogPosts = useSelector(state => getBlogPostsMemo(state, blogName));
  const [getProps] = useState<RestCallProps>({
    path: '/api/public/blogs/' + blogName,
    onSuccess: data => {
      dispatch(setBlogPosts({ ...data }));
    }
  });
  /* const { isLoading: isBlogPostDataLoading } = */ useGet(getProps);

  return { userBlogPosts };
}
