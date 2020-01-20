import React from 'react';
import { Input } from './Input';
import MarkdownEditor from './MarkdownEditor';

export function BlogEditor({ title, setTitle, content, setContent }) {
  return (
    <>
      <div className="pb-4">
        <Input placeholder="Title" value={title} onChange={setTitle} />
      </div>
      <MarkdownEditor value={content} onChange={setContent} />
    </>
  );
}
