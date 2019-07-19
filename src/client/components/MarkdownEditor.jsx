import React from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';
import { renderToString } from 'react-dom/server';

function generateHtmlFromMarkdown(markdown) {
  let html = renderToString(<ReactMarkdown source={markdown} />);
  return Promise.resolve(html);
}

export default function MarkdownEditor({ value, onChange }) {
  const [selectedTab, setSelectedTab] = React.useState('write');

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
}
