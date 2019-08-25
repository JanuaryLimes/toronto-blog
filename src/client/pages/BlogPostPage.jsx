import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGet } from 'client/hooks/useAxios';
import { withRouter } from 'react-router-dom';
import { DefaultButton } from 'client/components/Button';
import { LoadableDiv } from 'client/components/LoadableDiv';
import { TextArea, Input } from 'client/components/Input';
import Separator from 'client/components/Separator';
import { useLoggedUser } from 'client/hooks/useLoggedUser';

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
    path: '/api/public/blog-post/id/' + blogId,
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
  const [comment, setComment] = useState('');
  const [canAddComment, setCanAddComment] = useState(false);

  React.useEffect(() => {
    if (comment) {
      setCanAddComment(true);
    } else {
      setCanAddComment(false);
    }
  }, [comment]);

  function addCommentClick() {
    console.log('add coment');
  }

  const loggedUser = useLoggedUser();

  function addCommentSection() {
    return (
      <div>
        <TextArea
          value={comment}
          placeholder={'Comment...'}
          onChange={setComment}
          style={{ height: '100px' }}
        />
        <div className="py-2">
          <Input />

          <DefaultButton onClick={addCommentClick} disabled={!canAddComment}>
            Comment
          </DefaultButton>
        </div>
      </div>
    );
  }
  function displayComments() {
    return <div>comments</div>;
  }
  function render() {
    return (
      <LoadableDiv isLoading={isLoading}>
        {getSectionHeader()}
        {getBlogContent()}
        <Separator />
        {addCommentSection()}
        {displayComments()}
      </LoadableDiv>
    );
  }
  return render();
});

export { BlogPostPage };
