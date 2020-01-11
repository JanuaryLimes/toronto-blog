import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useGet, usePost, usePut } from '../hooks/useAxios';
import { withRouter } from 'react-router-dom';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { TextArea, Input, CheckBox } from '../components/Input';
import Separator from '../components/Separator';
import { useLoggedUser } from '../hooks/useLoggedUser';
import * as moment from 'moment';
import { useSuccessErrorAlert } from '../components/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BlogEditor } from '../components/BlogEditor';
import { useDispatch } from 'react-redux';
import { setBlogPostById } from '../actions';

const BlogPostPage = withRouter(function({ blogPostId, history }) {
  const dispatch = useDispatch();
  const [blogPost, setBlogPost] = useState({});
  const [comment, setComment] = useState('');
  const [canAddComment, setCanAddComment] = useState(false);
  const loggedUser = useLoggedUser();
  const [commentGuestUsername, setCommentGuestUsername] = useState('');
  const [commentAsGuest, setCommentAsGuest] = useState(false);
  const {
    showSuccessAlert,
    showErrorAlert,
    renderAlertsContainer
  } = useSuccessErrorAlert();
  const [editMode, setEditMode] = React.useState(false);
  const getCommentUsername = React.useMemo(
    () => () => {
      if (commentAsGuest) {
        return commentGuestUsername;
      } else {
        return loggedUser;
      }
    },
    [commentAsGuest, commentGuestUsername, loggedUser]
  );
  const [title, setTitle] = React.useState(blogPost.title);
  const [content, setContent] = React.useState(blogPost.content);

  React.useEffect(() => {
    setTitle(blogPost.title);
    setContent(blogPost.content);
  }, [blogPost.content, blogPost.title]);

  React.useEffect(() => {
    if (comment && getCommentUsername()) {
      setCanAddComment(true);
    } else {
      setCanAddComment(false);
    }
  }, [comment, getCommentUsername]);

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
        alert('Error, reload and try again (' + error + ')');
      },
      []
    )
  });

  const [postArgs, setPostArgs] = useState({});
  const { isLoading: postCommentIsLoading } = usePost(postArgs);

  const [putArgs, setPutArgs] = useState({});
  const { isLoading: putIsLoading, data: putData, error: putError } = usePut(
    putArgs
  );
  // TODO implement put parameters

  function getSectionHeader() {
    return (
      <div className="flex items-center">
        <DefaultButton
          onClick={() => {
            history.goBack();
          }}
        >
          <span className="px-1">{'<'}</span>
        </DefaultButton>
        <span className="text-lg font-semibold pl-2 flex-auto">
          {blogPost.title}
        </span>

        {editMode && (
          <span className="pl-2">
            <button
              className="px-2 py-1 w-8 hover:bg-green-700 rounded"
              title={'Save changes'}
              onClick={() => {
                console.log('save click');
                setPutArgs({
                  path: '/api/public/blog-post/id/' + blogPostId,
                  body: {
                    title,
                    content
                  },
                  onSuccess: result => {
                    console.log('put success', result);
                    dispatch(
                      setBlogPostById({
                        id: blogPostId,
                        blogPost: result.blogPost
                      })
                    );
                    setBlogPost(result.blogPost);
                    setEditMode(false);
                  },
                  onError: error => {
                    console.error('put error:\n\n', error);
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </span>
        )}

        <span className="pl-2">
          <button
            className="px-2 py-1 w-8 hover:bg-purple-700 rounded"
            title={editMode ? 'Cancel' : 'Edit post'}
            onClick={() => {
              console.warn('edit blog post');
              setEditMode(!editMode);
            }}
          >
            <FontAwesomeIcon icon={editMode ? faTimes : faPen} />
          </button>
        </span>
      </div>
    );
  }

  function getBlogContent() {
    return editMode ? blogPostEditState() : blogPostPreviewState();
  }

  function blogPostEditState() {
    return (
      <div className="pt-2">
        <BlogEditor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      </div>
    );
  }

  function blogPostPreviewState() {
    return (
      <div className="pt-2 blog-post-preview">
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
                value={commentGuestUsername}
                onChange={setCommentGuestUsername}
              />
            </div>
          )}
        </div>
      );
    }

    function addCommentClick() {
      setPostArgs({
        path: '/api/public/blog-post/comment/' + blogPostId,
        body: {
          commentText: comment,
          commentUsername: getCommentUsername()
        },
        onSuccess: result => {
          showSuccessAlert('Comment successfully added');

          if (blogPost && result.comment) {
            if (blogPost.comments == null) {
              blogPost.comments = [];
            }
            blogPost.comments.push(result.comment);
          }
        },
        onError: error => {
          showErrorAlert(error);
        }
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
        {renderAlertsContainer()}
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
      <LoadableDiv className="blog-post-page-element" isLoading={isLoading}>
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
