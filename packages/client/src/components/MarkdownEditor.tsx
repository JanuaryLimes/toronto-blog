import React from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';
import { renderToString } from 'react-dom/server';
import { MarkdownEditorProps } from '../types';

type SelectedTab = 'write' | 'preview';

function generateHtmlFromMarkdown(markdown: string) {
  let html = renderToString(<ReactMarkdown source={markdown} />);
  return Promise.resolve(html);
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = function({
  value,
  onChange
}) {
  const [selectedTab, setSelectedTab] = React.useState<SelectedTab>('write');

  function render() {
    return (
      <div className="markdown-editor">
        <ReactMde
          value={value}
          onChange={onChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            generateHtmlFromMarkdown(markdown)
          }
        />
      </div>
    );
  }

  return render();
};
