import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGet, usePost } from '../hooks/useAxios';
import { withRouter } from 'react-router-dom';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { TextArea, Input, CheckBox } from '../components/Input';
import Separator from '../components/Separator';
import { useLoggedUser } from '../hooks/useLoggedUser';
import * as moment from 'moment';

const BlogPostPage = withRouter(function({ blogPostId, history }) {
  const [blogPost, setBlogPost] = useState({});
  const [comment, setComment] = useState('');
  const [canAddComment, setCanAddComment] = useState(false);
  const [postCommentBody, setPostCommentBody] = useState();
  const loggedUser = useLoggedUser();
  const [commentUsername, setCommentUsername] = useState('');
  const [commentAsGuest, setCommentAsGuest] = useState(false);

  React.useEffect(() => {
    if (comment) {
      setCanAddComment(true);
    } else {
      setCanAddComment(false);
    }
  }, [comment]);

  const { isLoading } = useGet({
    path: '/api/public/blog-post/id/' + blogPostId,
    onSuccess: useMemo(
      () => result => {
        console.log('success', result);
        setBlogPost(result.blogPost);
      },
      []
    ),
    onError: useMemo(
      () => error => {
        console.log('error', error);
        // todo: alert?
      },
      []
    )
  });

  const { isLoading: postCommentIsLoading } = usePost({
    path: '/api/public/blog-post/comment/' + blogPostId,
    body: postCommentBody,
    onSuccess: useMemo(
      () => result => {
        console.log('post comment success: ', result);
        // TODO alert
      },
      []
    ),
    onError: useMemo(
      () => error => {
        console.log('post comment error: ', error);
        // TODO alert
      },
      []
    )
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

  function addCommentSection() {
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

    function addCommentClick() {
      console.log('add comment');
      setPostCommentBody({
        commentText: comment,
        commentUsername: commentUsername || loggedUser
      });
    }

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
    const hasComments = !!(blogPost && blogPost.comments);

    function noCommentsInfo() {
      return <div>No comments</div>;
    }

    function displaySeparator(id) {
      if (
        blogPost &&
        blogPost.comments &&
        blogPost.comments[0] &&
        blogPost.comments[0]._id === id
      ) {
        return '';
      } else {
        return <Separator />;
      }
    }

    function commentTime(time) {
      const date = new Date(time);
      const createdFromNow = moment(date).fromNow();

      return <span>{createdFromNow}</span>;
    }

    function commentsInfo() {
      return (
        <ul>
          {hasComments &&
            blogPost.comments.map(comment => (
              <li key={comment._id}>
                {displaySeparator(comment._id)}
                <div className="flex pb-1 text-sm">
                  {/* TODO mark guest user comments */}
                  <h2 className="font-bold">{comment.commentUsername}</h2>
                  <span className="px-1">&mdash;</span>
                  {commentTime(comment.commentDate)}
                </div>
                <div>{comment.commentText}</div>
              </li>
            ))}
        </ul>
      );
    }

    return (
      <div className="pt-4">
        {hasComments ? commentsInfo() : noCommentsInfo()}
      </div>
    );
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
