import React from 'react';
import { BlogPostPage } from './BlogPostPage';
import { BlogPage } from './BlogPage';
import { useRouteMatch } from 'react-router-dom';

export const BlogPageHandler = function() {
  const match = useRouteMatch<{
    blogName: string;
    blogPostId: string;
  }>();
  const { blogName, blogPostId } = match.params;
  function render() {
    if (blogPostId) {
      return <BlogPostPage blogPostId={blogPostId} blogName={blogName} />;
    } else {
      return <BlogPage blogName={blogName} />;
    }
  }
  return render();
};
