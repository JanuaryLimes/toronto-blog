import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGet, usePost } from '../hooks/useAxios';
import { withRouter } from 'react-router-dom';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { TextArea, Input, CheckBox } from '../components/Input';
import Separator from '../components/Separator';
import { useLoggedUser } from '../hooks/useLoggedUser';

const BlogPostPage = withRouter(function({ blogPostId, history }) {
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
    path: '/api/public/blog-post/id/' + blogPostId,
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

  const [postCommentBody, setPostCommentBody] = useState();

  const { isLoading: postCommentIsLoading } = usePost({
    path: '/api/public/blog-post/comment/' + blogPostId,
    body: postCommentBody,
    onSuccess: useMemo(
      () => result => {
        console.log('post comment success: ', result);
      },
      []
    ),
    onError: useMemo(
      () => error => {
        console.log('post comment error: ', error);
      },
      []
    )
  });

  function addCommentClick() {
    console.log('add comment');
    setPostCommentBody({
      commentText: comment,
      commentUsername: commentUsername || loggedUser
    });
  }

  const loggedUser = useLoggedUser();
  const [commentUsername, setCommentUsername] = useState('');
  const [commentAsGuest, setCommentAsGuest] = useState(false);

  function getCommenter() {
    let showCustomCommenter = commentAsGuest;
    if (!loggedUser) {
      showCustomCommenter = true;
    }

    function commentAsGuestCheckbox() {
      if (loggedUser) {
        return (
          <div className="pb-2">
            <CheckBox
              label="Comment as guest"
              checked={commentAsGuest}
              onChange={setCommentAsGuest}
            />
          </div>
        );
      }
      return '';
    }

    return (
      <div className="">
        {commentAsGuestCheckbox()}
        {showCustomCommenter && (
          <div className="pb-2">
            <Input
              placeholder="Name..."
              value={commentUsername}
              onChange={setCommentUsername}
            />
          </div>
        )}
      </div>
    );
  }

  function addCommentSection() {
    return (
      <LoadableDiv isLoading={postCommentIsLoading}>
        <div className="addCommentSection">
          <TextArea
            value={comment}
            placeholder={'Comment...'}
            onChange={setComment}
            style={{ height: '100px' }}
          />
          <div className="py-2">
            {getCommenter()}
            <DefaultButton onClick={addCommentClick} disabled={!canAddComment}>
              Comment
            </DefaultButton>
          </div>
        </div>
      </LoadableDiv>
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
