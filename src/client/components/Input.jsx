import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, caption, value, onChange, validationStatus }) => {
  return (
    <div className="input-container">
      <label>{caption}</label>
      <input
        className={['form-control', validationStatus].join(' ')}
        value={value}
        type={type}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
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
