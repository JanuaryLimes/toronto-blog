import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../hooks/useAxios';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { useSuccessErrorAlert } from '../components/Alert';
import faker from 'faker';
import { BlogEditor } from '../components/BlogEditor';

export const DashboardPage = function() {
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

  function getMarkdownEditor() {
    return (
      <BlogEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
      />
    );
  }

  function getActionButtons() {
    return (
      <div className="pt-4 flex">
        <DefaultButton
          onClick={addPost}
          onContextMenu={e => {
            e.preventDefault();
            setTitle(faker.lorem.sentence());
            setContent(faker.lorem.paragraphs());
          }}
        >
          Add post
        </DefaultButton>
        <div className="flex-1" />
        <Link to={'/blog/' + loggedUser}>
          <DefaultButton>Go to your blog</DefaultButton>
        </Link>
      </div>
    );
  }

  function getAlertContainer() {
    return <div className="pt-4">{renderAlertsContainer()}</div>;
  }

  function render() {
    return (
      <div className="dashboard-page">
        <LoadableDiv isLoading={isLoading}>
          <p className="font-semibold text-lg pb-2">Create new blog post</p>
          <div>
            {getMarkdownEditor()}
            {getActionButtons()}
            {getAlertContainer()}
          </div>
        </LoadableDiv>
      </div>
    );
  }

  return render();
};
