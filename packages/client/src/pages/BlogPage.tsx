import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setBlogPosts, deleteBlogPostById } from '../actions';
import { useGet, useDelete } from '../hooks/useAxios';
import { Link, useRouteMatch } from 'react-router-dom';
import { Separator } from '../components/Separator';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserBlogPost, RestCallProps, BlogPageProps } from '../types';
import { useSelector } from '../hooks/useSelector';
import { getBlogPosts } from '../selectors/getBlogPosts';

type BlogPostTemplateProps = {
  blogPost: UserBlogPost;
};

const BlogPage: React.FC<BlogPageProps> = function({ blogName }) {
  const dispatch = useDispatch();
  const getBlogPostsMemo = useMemo(() => getBlogPosts, []);
  const userBlogPosts = useSelector(state => getBlogPostsMemo(state, blogName));
  const mOnSuccess = useMemo(
    () => (data: any) => {
      dispatch(setBlogPosts({ ...data }));
    },
    [dispatch]
  );

  /* const { isLoading: isBlogPostDataLoading } = */ useGet({
    path: '/api/public/blogs/' + blogName,
    onSuccess: mOnSuccess
  });

  function displayUserBlogPosts() {
    return (
      <ul>
        {userBlogPosts?.map((blogPost: UserBlogPost) => {
          return (
            <li key={blogPost._id} className="">
              <BlogPostTemplate blogPost={blogPost} />
            </li>
          );
        })}
      </ul>
    );
  }
  function render() {
    return <div className="BlogPage">{displayUserBlogPosts()}</div>;
  }

  return render();
};

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = function({
  blogPost
}) {
  const match = useRouteMatch();
  const date = new Date(blogPost.postDate);
  const createdFromNow = moment(date).fromNow();
  const dispatch = useDispatch();
  const loggedUser = useLoggedUser();
  const blogOwner =
    !blogPost || !loggedUser ? false : blogPost?.blogName === loggedUser;

  const [deleteArgs, setDeleteArgs] = useState<RestCallProps>({});
  /* const { isLoading, data, error } = */ useDelete(deleteArgs); // TODO

  function getBlogPostLink() {
    let url = match.url;
    const lastChar = match.url.slice(-1);
    if (lastChar === '/') {
      url = url.slice(0, -1);
    }

    return url + '/' + blogPost._id;
  }

  function blogPostHeader() {
    return (
      <div className="flex">
        <span>Created: {createdFromNow}</span>
        <span className="flex-auto"></span>
        {blogOwner && (
          <span className="pl-2">
            <button
              className="px-2 py-1 w-8 hover:bg-red-700 rounded"
              onClick={() => {
                if (window.confirm('Are you sure to delete this item?')) {
                  setDeleteArgs({
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
                  });
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </span>
        )}
      </div>
    );
  }

  function blogPostContent() {
    return (
      <>
        <div className="font-bold text-2xl pb-6 underline">
          <Link to={getBlogPostLink()}>{blogPost.title}</Link>
        </div>
        <div className="mde-preview">
          <div className="mde-preview-content">
            <ReactMarkdown source={blogPost.content} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="BlogPostTemplate blog-post-preview">
      {blogPostHeader()}
      {blogPostContent()}
      <Separator />
    </div>
  );
};

export { BlogPage };
