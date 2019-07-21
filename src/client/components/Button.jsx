import React from 'react';

function DefaultButton({ children, onClick = () => {} }) {
  function render() {
    return (
      <button
        onClick={e => onClick(e)}
        className="bg-purple-700 hover:bg-purple-800 px-2 py-1 rounded"
      >
        {children}
      </button>
    );
  }

  return render();
}

export { DefaultButton };
