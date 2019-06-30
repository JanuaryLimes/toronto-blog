import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, caption, value, onChange, validationStatus }) => {
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

  function render() {
    var validationClass = getValidationStatusClassName(validationStatus);
    return (
      <div className="flex flex-col">
        <label className="mt-2">{caption}</label>
        <input
          className={[
            'bg-white text-gray-900 py-1 px-2 rounded border-2 outline-none',
            validationClass
          ].join(' ')}
          value={value}
          type={type}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    );
  }

  return render();
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

export default Input;
