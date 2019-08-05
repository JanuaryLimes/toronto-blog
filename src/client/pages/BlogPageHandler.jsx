import React from 'react';
import { BlogPostPage } from 'client/pages/BlogPostPage';
import { BlogPage } from 'client/pages/BlogPage';

export function BlogPageHandler({ match }) {
  const { blogName, blogId } = match.params;
  function render() {
    if (blogId) {
      return <BlogPostPage blogId={blogId} />;
    } else {
      return <BlogPage blogName={blogName} />;
    }
  }
  return render();
}
