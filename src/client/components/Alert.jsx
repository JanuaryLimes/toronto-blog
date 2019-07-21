import React, { useState } from 'react';
import { SlideInOut } from './Animate';

function useAlertProps() {
  const [_alertText, _setAlertText] = useState('');
  const [alertVisible, _setAlertVisible] = useState(false);

  function show(text) {
    _setAlertText(text);
    _setAlertVisible(true);
  }

  function hide() {
    _setAlertText('');
    _setAlertVisible(false);
  }

  return {
    alertVisible,
    show,
    hide,
    _setAlertVisible,
    _alertText,
    _setAlertText
  };
}

function BaseErrorAlert({
  alertVisible,
  show,
  hide,
  _setAlertVisible,
  _alertText,
  _setAlertText,
  getType,
  ...rest
}) {
  const alertProps = {
    text: _alertText,
    type: getType(),
    onClose: () => {
      _setAlertVisible(false);
    }
  };

  function render() {
    return (
      <SlideInOut condition={alertVisible}>
        <div {...rest}>
          <Alert {...alertProps} />
        </div>
      </SlideInOut>
    );
  }

  return render();
}

function ErrorAlert(props) {
  function getType() {
    return 'alert-danger';
  }

  return BaseErrorAlert({ ...props, getType });
}

function SuccessAlert(props) {
  function getType() {
    return 'alert-success';
  }

  return BaseErrorAlert({ ...props, getType });
}

const Alert = ({ text, type, onClose }) => {
  const getDataDismiss = () => {
    if (onClose) {
      return null;
    } else {
      return 'alert';
    }
  };

  function getTypeClassNames() {
    if (type === 'alert-success') {
      return 'bg-green-300 text-green-700';
    } else if (type === 'alert-danger') {
      return 'bg-red-300 text-red-700';
    }
    return '';
  }

  function render() {
    return (
      <div className="pb-2 pt-2 pt-4">
        <div
          className={[getTypeClassNames(), 'p-2 pr-10 relative rounded'].join(
            ' '
          )}
          role="alert"
        >
          {text}
          <button
            type="button"
            data-dismiss={getDataDismiss()}
            className="close absolute close pt-1 px-3 right-0 text-xl top-0"
            onClick={onClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }

  return render();
};

Alert.defaultProps = {
  text: '',
  type: 'alert-success'
};

export { Alert, SuccessAlert, ErrorAlert, useAlertProps };
