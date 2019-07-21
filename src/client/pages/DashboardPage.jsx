import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { usePost } from '../hooks/useAxios';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { Input } from '../components/Input';
import MarkdownEditor from '../components/MarkdownEditor';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { SlideInOut } from '../components/Animate';
import { SuccessAlert, useAlertProps, ErrorAlert } from '../components/Alert';

export default withRouter(function DashboardPage({ match, location }) {
  const loggedUser = useLoggedUser();
  const [postArgs, setPostArgs] = useState({});
  const { isLoading } = usePost(postArgs);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const successAlertProps = useAlertProps();
  const errorAlertProps = useAlertProps();

  function addPost() {
    setPostArgs({
      path: '/api/secure/dashboard/create-new-blog-post',
      body: {
        title: title,
        content: content,
        blogName: loggedUser,
        postDate: Date.now()
      },
      onSuccess: data => {
        console.log('post success', data);

        errorAlertProps.clear();
        successAlertProps.set('Blog post sucessfully added');
      },
      onError: error => {
        console.log('post error', error);

        errorAlertProps.set(error);
        successAlertProps.clear();
      }
    });
  }

  function getMarkdownEditor() {
    return (
      <>
        <div className="pb-4">
          <Input placeholder="Title" value={title} onChange={setTitle} />
        </div>
        <MarkdownEditor value={content} onChange={setContent} />
      </>
    );
  }

  function getActionButtons() {
    return (
      <div className="pt-4 flex">
        <DefaultButton onClick={addPost}>Add post</DefaultButton>
        <div className="flex-1" />
        <Link to={'/' + loggedUser}>
          <DefaultButton>Go to your blog</DefaultButton>
        </Link>
      </div>
    );
  }

  function getAlertContainer() {
    return (
      <SlideInOut
        condition={
          errorAlertProps.alertVisible || successAlertProps.alertVisible
        }
      >
        <SuccessAlert className="pt-4" {...successAlertProps} />
        <ErrorAlert className="pt-4" {...errorAlertProps} />
      </SlideInOut>
    );
  }

  function render() {
    return (
      <div className="dashboard-page">
        <LoadableDiv isLoading={isLoading}>
          <p className="font-semibold text-lg">Create new blog post</p>
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
});
