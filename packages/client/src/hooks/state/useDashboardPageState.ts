import React, { useState } from 'react';
import { usePost } from '../useAxios';
import { useLoggedUser } from '../useLoggedUser';
import { useSuccessErrorAlert } from '../../components/Alert';
import faker from 'faker';

export function useDashboardPageState() {
  const loggedUser = useLoggedUser();
  const [postArgs, setPostArgs] = useState({});
  const { isLoading } = usePost(postArgs);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addPostDisabled, setAddPostDisabled] = useState(true);
  const {
    showSuccessAlert,
    showErrorAlert,
    renderAlertsContainer
  } = useSuccessErrorAlert();

  React.useEffect(() => {
    if (!title || !content) {
      setAddPostDisabled(true);
    } else {
      setAddPostDisabled(false);
    }
  }, [content, title]);

  function addPost() {
    if (addPostDisabled) {
      showErrorAlert('Can not add empty blog post');
      return;
    }
    setPostArgs({
      path: '/api/secure/dashboard/create-new-blog-post',
      body: {
        title: title,
        content: content,
        blogName: loggedUser
      },
      onSuccess: (_data: any) => {
        showSuccessAlert('Blog post successfully added');
      },
      onError: (error: string) => {
        showErrorAlert(error);
      }
    });
  }

  function generateFakePostData(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setTitle(faker.lorem.sentence());
    setContent(faker.lorem.paragraphs());
  }

  return {
    title,
    setTitle,
    content,
    setContent,
    addPost,
    loggedUser,
    renderAlertsContainer,
    isLoading,
    generateFakePostData
  };
}
