import React, { useState } from 'react';
import { SlideInOut } from './Animate';

type UseAlertProps = {
  alertVisible: boolean;
  show: (text: string) => void;
  hide: () => void;
  _setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  _setAlertText: React.Dispatch<React.SetStateAction<string>>;
  _alertText: string;
};

type BaseAlertProps = UseAlertProps & {
  getType: () => string; // TODO enum
};

type AlertProps = {
  text: string;
  type: string;
  onClose?: () => void;
};

function useAlertProps(): UseAlertProps {
  const [_alertText, _setAlertText] = useState('');
  const [alertVisible, _setAlertVisible] = useState(false);

  function show(text: string) {
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

export const BaseAlert: React.FC<BaseAlertProps> = function({
  alertVisible,
  show,
  hide,
  _setAlertVisible,
  _alertText,
  _setAlertText,
  getType
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
        <div>
          <Alert {...alertProps} />
        </div>
      </SlideInOut>
    );
  }

  return render();
};

const ErrorAlert: React.FC<UseAlertProps> = function(props) {
  function getType() {
    return 'alert-danger';
  }

  return BaseAlert({ ...props, getType });
};

const SuccessAlert: React.FC<UseAlertProps> = function(props) {
  function getType() {
    return 'alert-success';
  }

  return BaseAlert({ ...props, getType });
};

const Alert: React.FC<AlertProps> = ({ text, type, onClose }) => {
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
    );
  }

  return render();
};

function useSuccessErrorAlert() {
  const successAlertProps = useAlertProps();
  const errorAlertProps = useAlertProps();

  function renderAlertsContainer() {
    return (
      <div className="overflow-hidden">
        <SlideInOut
          condition={
            errorAlertProps.alertVisible || successAlertProps.alertVisible
          }
        >
          <SuccessAlert {...successAlertProps} />
          <ErrorAlert {...errorAlertProps} />
        </SlideInOut>
      </div>
    );
  }

  const showSuccessAlert = React.useMemo(
    () => (message: string) => {
      errorAlertProps.hide();
      successAlertProps.show(message);
    },
    [errorAlertProps, successAlertProps]
  );

  const showErrorAlert = React.useMemo(
    () => (error: string) => {
      errorAlertProps.show(error);
      successAlertProps.hide();
    },
    [errorAlertProps, successAlertProps]
  );

  return { showSuccessAlert, showErrorAlert, renderAlertsContainer };
}

export { useSuccessErrorAlert };
