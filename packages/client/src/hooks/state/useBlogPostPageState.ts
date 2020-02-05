import React, { useMemo, useState } from 'react';
import { BlogPostPageProps, UserBlogPost } from '../../types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoggedUser } from '../useLoggedUser';
import { getBlogPost } from '../../selectors/getBlogPost';
import { useSuccessErrorAlert } from '../../components/Alert';
import { useGet, usePost, usePut } from '../useAxios';
import { useSelector } from '../useSelector';
import { setBlogPostById } from '../../actions';

export function useBlogPostPageState({
  blogName,
  blogPostId
}: BlogPostPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useLoggedUser();
  const getBlogPostMemo = useMemo(() => getBlogPost, []);
  const blogPostFromStore = useSelector(state => {
    return getBlogPostMemo(state, { blogName, blogPostId });
  });
  const [blogPost, setBlogPost] = useState<UserBlogPost | undefined>(
    blogPostFromStore
  );
  const [comment, setComment] = useState('');
  const [canAddComment, setCanAddComment] = useState(false);
  const isPostAuthor =
    !blogPost || !loggedUser ? false : blogPost?.blogName === loggedUser;
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
  const [title, setTitle] = React.useState(blogPost?.title);
  const [content, setContent] = React.useState(blogPost?.content);

  React.useEffect(() => {
    const content = blogPost?.content;
    const title = blogPost?.title;
    setTitle(title);
    setContent(content);
  }, [blogPost]);

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
  /*const { isLoading: putIsLoading, data: putData, error: putError } = */ usePut(
    putArgs
  );
  // TODO implement put parameters

  function onGoBack() {
    history.goBack();
  }

  function onSaveChanges() {
    console.log('save click');
    setPutArgs({
      path: '/api/public/blog-post/id/' + blogPostId,
      body: {
        title,
        content
      },
      onSuccess: (result: any) => {
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
      onError: (error: any) => {
        console.error('put error:\n\n', error);
      }
    });
  }

  function toggleEditMode() {
    console.warn('edit blog post');
    setEditMode(!editMode);
  }
  function addCommentClick() {
    setPostArgs({
      path: '/api/public/blog-post/comment/' + blogPostId,
      body: {
        commentText: comment,
        commentUsername: getCommentUsername()
      },
      onSuccess: (result: any) => {
        showSuccessAlert('Comment successfully added');

        if (blogPost && result.comment) {
          if (blogPost.comments == null) {
            blogPost.comments = [];
          }
          blogPost.comments.push(result.comment);
        }
      },
      onError: (error: any) => {
        showErrorAlert(error);
      }
    });
  }

  return {
    onGoBack,
    blogPost,
    isPostAuthor,
    onSaveChanges,
    editMode,
    toggleEditMode,
    addCommentClick,
    editStateProps: {
      title,
      setTitle,
      content,
      setContent
    },
    addCommentSectionProps: {
      commentAsGuest,
      loggedUser, // ?
      setCommentAsGuest,
      commentGuestUsername,
      setCommentGuestUsername,
      postCommentIsLoading,
      comment,
      setComment,
      canAddComment,
      renderAlertsContainer
    },
    isRootLoading: blogPostFromStore != null ? false : isLoading
  };
}
