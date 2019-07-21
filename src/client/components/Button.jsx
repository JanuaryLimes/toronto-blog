import React from 'react';

function DefaultButton({ children, onClick = () => {}, disabled = false }) {
  function getDisabledClassName() {
    if (disabled) {
      return 'cursor-not-allowed';
    } else {
      return 'hover:bg-purple-800';
    }
  }

  function render() {
    return (
      <button
        onClick={e => onClick(e)}
        disabled={disabled}
        className={[
          'bg-purple-700 ',
          getDisabledClassName(),
          'px-2 py-1 rounded'
        ].join(' ')}
      >
        {children}
      </button>
    );
  }

  return render();
}

export { DefaultButton };
