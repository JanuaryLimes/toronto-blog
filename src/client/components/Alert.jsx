import React, { useState, useEffect } from 'react';
import { SlideInOut } from './Animate';

function useAlertProps() {
  const [alertText, setAlertText] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  function set(text) {
    setAlertText(text);
    setAlertVisible(true);
  }

  function clear() {
    setAlertText('');
    setAlertVisible(false);
  }

  return {
    alertVisible,
    setAlertVisible,
    alertText,
    setAlertText,
    set,
    clear
  };
}

function BaseErrorAlert({
  alertVisible,
  setAlertVisible,
  alertText,
  setAlertText,
  set,
  clear,
  getType,
  ...rest
}) {
  const [alertProps, setAlertProps] = useState({});

  useEffect(() => {
    if (alertText) {
      setAlertProps({
        text: alertText,
        type: getType(),
        onClose: () => {
          setAlertVisible(false);
        }
      });
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }, [setAlertVisible, alertText, getType]);

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
