import React from 'react';
import { BlogPostPage } from 'client/pages/BlogPostPage';
import { BlogPage } from 'client/pages/BlogPage';

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
