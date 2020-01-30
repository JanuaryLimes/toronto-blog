import React from 'react';
import ReactMarkdown from 'react-markdown';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { TextArea, Input, CheckBox } from '../components/Input';
import { Separator } from '../components/Separator';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { BlogEditor } from '../components/BlogEditor';
import { BlogPostPageProps } from '../types';
import { useBlogPostPageState } from '../hooks/state/useBlogPostPageState';

// TODO remove 'any' types

const BlogPostPage: React.FC<BlogPostPageProps> = function({
  blogName,
  blogPostId
}) {
  const {
    onGoBack,
    blogPost,
    isPostAuthor,
    onSaveChanges,
    editMode,
    toggleEditMode,
    addCommentClick,
    editStateProps,
    isRootLoading,
    addCommentSectionProps
  } = useBlogPostPageState({
    blogName,
    blogPostId
  });

  function getSectionHeader() {
    return (
      <div className="flex items-center">
        <DefaultButton onClick={onGoBack}>
          <span className="px-1">{'<'}</span>
        </DefaultButton>
        <span className="text-lg font-semibold pl-2 flex-auto">
          {blogPost?.title}
        </span>

        {isPostAuthor && (
          <>
            {editMode && (
              <span className="pl-2">
                <button
                  className="px-2 py-1 w-8 hover:bg-green-700 rounded"
                  title={'Save changes'}
                  onClick={onSaveChanges}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </span>
            )}

            <span className="pl-2">
              <button
                className="px-2 py-1 w-8 hover:bg-purple-700 rounded"
                title={editMode ? 'Cancel' : 'Edit post'}
                onClick={toggleEditMode}
              >
                <FontAwesomeIcon icon={editMode ? faTimes : faPen} />
              </button>
            </span>
          </>
        )}
      </div>
    );
  }

  function getBlogContent() {
    function blogPostEditState() {
      const { title, setTitle, content, setContent } = editStateProps;

      return (
        <div className="pt-2">
          <BlogEditor
            title={title ?? ''}
            setTitle={setTitle}
            content={content ?? ''}
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
              <ReactMarkdown source={blogPost?.content} />
            </div>
          </div>
        </div>
      );
    }

    return editMode ? blogPostEditState() : blogPostPreviewState();
  }

  function addCommentSection() {
    const {
      commentAsGuest,
      loggedUser,
      setCommentAsGuest,
      setComment,
      canAddComment,
      comment,
      commentGuestUsername,
      postCommentIsLoading,
      renderAlertsContainer,
      setCommentGuestUsername
    } = addCommentSectionProps;
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

    function displaySeparator(id: string) {
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

    function commentTime(time: string) {
      const date = new Date(time);
      const createdFromNow = moment(date).fromNow();

      return <span>{createdFromNow}</span>;
    }

    function commentsInfo() {
      return (
        <ul>
          {hasComments &&
            blogPost?.comments.map(comment => (
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
      <LoadableDiv className="blog-post-page-element" isLoading={isRootLoading}>
        {getSectionHeader()}
        {getBlogContent()}
        <Separator />
        {addCommentSection()}
        {displayComments()}
      </LoadableDiv>
    );
  }
  return render();
};

export { BlogPostPage };
