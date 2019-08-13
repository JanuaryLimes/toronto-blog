import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGet } from 'client/hooks/useAxios';
import { withRouter } from 'react-router-dom';
import { DefaultButton } from 'client/components/Button';
import { LoadableDiv } from 'client/components/LoadableDiv';
import { TextArea } from 'client/components/Input';

const BlogPostPage = withRouter(function({ blogId, history }) {
  const [blogPost, setBlogPost] = useState({});
  const onSuccess = useMemo(
    () => result => {
      console.log('success', result);
      setBlogPost(result.blogPost);
    },
    []
  );
  const onError = useMemo(
    () => error => {
      console.log('error', error);
      // todo: alert?
    },
    []
  );
  const { isLoading } = useGet({
    path: '/api/public/blogs/id/' + blogId,
    onSuccess,
    onError
  });
  function getSectionHeader() {
    return (
      <div>
        <DefaultButton
          onClick={() => {
            history.goBack();
          }}
        >
          <span className="px-1">{'<'}</span>
        </DefaultButton>
        <span className="text-lg font-semibold pl-2">{blogPost.title}</span>
      </div>
    );
  }
  function getBlogContent() {
    return (
      <div className="pt-2 blog-item">
        <div className="mde-preview">
          <div className="mde-preview-content">
            <ReactMarkdown source={blogPost.content} />
          </div>
        </div>
      </div>
    );
  }
  const [comment, setComment] = React.useState('');

  function addCommentSection() {
    return (
      <div>
        <TextArea
          value={comment}
          onChange={setComment}
          caption={'Comment:'}
          style={{ height: '100px' }}
        />
      </div>
    );
  }
  function displayComments() {
    return <div>comments</div>;
  }
  function getCommentsContent() {
    return (
      <div>
        <hr class="bg-purple-700 my-6 p-1 rounded" />
        {addCommentSection()}
        {displayComments()}
      </div>
    );
  }
  function render() {
    return (
      <LoadableDiv isLoading={isLoading}>
        {getSectionHeader()}
        {getBlogContent()}
        {getCommentsContent()}
      </LoadableDiv>
    );
  }
  return render();
});

export { BlogPostPage };
