import React from 'react';

const Alert = ({ text, type, onClose }) => {
  const getDataDismiss = () => {
    if (onClose) {
      return null;
    } else {
      return 'alert';
    }
  };

  return (
    <div
      className={['alert', type, 'alert-dismissible', 'fade', 'show'].join(' ')}
      role="alert"
    >
      {text}
      <button
        type="button"
        data-dismiss={getDataDismiss()}
        className="close"
        onClick={onClose}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Alert.defaultProps = {
  text: '',
  type: 'alert-success'
};

export default Alert;
