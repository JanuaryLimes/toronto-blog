import React from 'react';
import { BlogPostPage } from '../pages/BlogPostPage';
import { BlogPage } from '../pages/BlogPage';

export function BlogPageHandler({ match }) {
  const { blogName, blogPostId } = match.params;
  function render() {
    if (blogPostId) {
      return <BlogPostPage blogPostId={blogPostId} />;
    } else {
      return <BlogPage blogName={blogName} />;
    }
  }
  return render();
}
