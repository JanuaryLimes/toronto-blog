import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Separator } from '../components/Separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserBlogPost, BlogPageProps } from '../types';
import {
  useBlogPageState,
  useBlogPostTemplateState
} from '../hooks/state/useBlogPageState';

const BlogPage: React.FC<BlogPageProps> = function({ blogName }) {
  const { userBlogPosts } = useBlogPageState(blogName);

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

  return <div className="BlogPage">{displayUserBlogPosts()}</div>;
};

type BlogPostTemplateProps = {
  blogPost: UserBlogPost;
};

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = function({
  blogPost
}) {
  const {
    createdFromNow,
    blogOwner,
    onDelete,
    getBlogPostLink
  } = useBlogPostTemplateState(blogPost);

  function blogPostHeader() {
    return (
      <div className="flex">
        <span>Created: {createdFromNow}</span>
        <span className="flex-auto"></span>
        {blogOwner && (
          <span className="pl-2">
            <button
              className="px-2 py-1 w-8 hover:bg-red-700 rounded"
              onClick={onDelete}
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
