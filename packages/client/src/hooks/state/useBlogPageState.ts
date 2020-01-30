import { useMemo, useState } from 'react';
import { getBlogPosts } from '../../selectors/getBlogPosts';
import { RestCallProps, UserBlogPost } from '../../types';
import { setBlogPosts, deleteBlogPostById } from '../../actions';
import { useGet, useDelete } from '../useAxios';
import { useDispatch } from 'react-redux';
import { useSelector } from '../useSelector';
import { useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { useLoggedUser } from '../useLoggedUser';

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

export function useBlogPostTemplateState(blogPost: UserBlogPost) {
  const match = useRouteMatch();
  const date = new Date(blogPost.postDate);
  const createdFromNow = moment(date).fromNow();
  const dispatch = useDispatch();
  const loggedUser = useLoggedUser();
  const blogOwner =
    !blogPost || !loggedUser ? false : blogPost?.blogName === loggedUser;
  const [deleteArgs, setDeleteArgs] = useState<RestCallProps>({});
  /* const { isLoading, data, error } = */ useDelete(deleteArgs); // TODO
  const deleteCallProps = {
    path: '/api/public/blog-post/id/' + blogPost._id,
    onSuccess: (result: any) => {
      console.log('delete success', result);
      dispatch(
        deleteBlogPostById({
          id: blogPost._id,
          blogName: blogPost.blogName
        })
      );
    },
    onError: (error: any) => {
      console.error('delete error:\n\n', error);
    }
  };

  function getBlogPostLink() {
    let url = match.url;
    const lastChar = match.url.slice(-1);
    if (lastChar === '/') {
      url = url.slice(0, -1);
    }

    return url + '/' + blogPost._id;
  }

  function onDelete() {
    if (window.confirm('Are you sure to delete this item?')) {
      setDeleteArgs({ ...deleteCallProps });
    }
  }

  return {
    createdFromNow,
    blogOwner,
    onDelete,
    getBlogPostLink
  };
}
