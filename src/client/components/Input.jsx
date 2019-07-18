import React from 'react';
import PropTypes from 'prop-types';

const INPUT_TYPE = {
  Input: 0,
  TextArea: 1
};

function getValidationStatusClassName(status) {
  if (status) {
    if (status === 'is-valid') {
      return 'border-green-600';
    } else if (status === 'is-invalid') {
      return 'border-red-600';
    }
  }
  return 'border-gray-600';
}

function render(type, props) {
  var inputProps = {
    className: [
      'bg-white text-gray-900 py-1 px-2 rounded border-2 outline-none',
      getValidationStatusClassName(props.validationClass)
    ].join(' '),
    value: props.value,
    type: props.type,
    onChange: e => props.onChange(e.target.value)
  };

  function getInput() {
    switch (type) {
      case INPUT_TYPE.Input:
        return <input {...inputProps} />;
      case INPUT_TYPE.TextArea:
        return <textarea {...inputProps} style={{ height: '200px' }} />;
      default:
        return '';
    }
  }

  return (
    <div className="flex flex-col">
      <label className="mt-2">{props.caption}</label>
      {getInput()}
    </div>
  );
}

const Input = ({ type, caption, value, onChange, validationStatus }) => {
  return render(INPUT_TYPE.Input, {
    type,
    caption,
    value,
    onChange,
    validationStatus
  });
};

Input.propTypes = {
  caption: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  validationStatus: PropTypes.string,
  value: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  validationStatus: ''
};

function TextArea({ type, caption, value, onChange, validationStatus }) {
  return render(INPUT_TYPE.TextArea, {
    type,
    caption,
    value,
    onChange,
    validationStatus
  });
}

export { Input, TextArea };
