import React from 'react';
import { Input } from './Input';
import MarkdownEditor from './MarkdownEditor';
import { BlogEditorProps } from '../types';

export const BlogEditor: React.FC<BlogEditorProps> = function({
  title,
  setTitle,
  content,
  setContent
}) {
  return (
    <>
      <div className="pb-4">
        <Input placeholder="Title" value={title} onChange={setTitle} />
      </div>
      <MarkdownEditor value={content} onChange={setContent} />
    </>
  );
};
