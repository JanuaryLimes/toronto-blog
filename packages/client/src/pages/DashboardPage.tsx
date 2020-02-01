import React from 'react';
import { Link } from 'react-router-dom';
import { DefaultButton } from '../components/Button';
import { LoadableDiv } from '../components/LoadableDiv';
import { BlogEditor } from '../components/BlogEditor';
import { useDashboardPageState } from '../hooks/state/useDashboardPageState';

export const DashboardPage = function() {
  const {
    title,
    setTitle,
    content,
    setContent,
    addPost,
    loggedUser,
    renderAlertsContainer,
    isLoading,
    generateFakePostData
  } = useDashboardPageState();

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
        <DefaultButton onClick={addPost} onContextMenu={generateFakePostData}>
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
