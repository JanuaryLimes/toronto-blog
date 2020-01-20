import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

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
  return 'border-gray-800';
}

function render(type, props) {
  const inputProps = {
    className: [
      'text-white py-1 px-2 rounded border-2 outline-none',
      'focus:border-purple-700',
      getValidationStatusClassName(props.validationStatus)
    ].join(' '),
    value: props.value,
    type: props.type,
    onChange: e => props.onChange(e.target.value),
    placeholder: props.placeholder
  };

  function getInput() {
    switch (type) {
      case INPUT_TYPE.Input:
        return (
          <input
            {...inputProps}
            style={{ backgroundColor: 'rgb(17, 17, 17)' }}
          />
        );
      case INPUT_TYPE.TextArea:
        return (
          <textarea
            {...inputProps}
            style={{
              height: '200px',
              backgroundColor: 'rgb(17, 17, 17)',
              ...props.style
            }}
          />
        );
      default:
        return '';
    }
  }

  function getLabel() {
    if (props.caption) {
      return <label className="mt-2">{props.caption}</label>;
    }
    return '';
  }

  return (
    <div className="flex flex-col">
      {getLabel()}
      {getInput()}
    </div>
  );
}

const Input = ({
  type,
  caption,
  value,
  onChange,
  validationStatus,
  placeholder
}) => {
  return render(INPUT_TYPE.Input, {
    type,
    caption,
    value,
    onChange,
    validationStatus,
    placeholder
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

function TextArea({
  type,
  caption,
  value,
  onChange,
  validationStatus,
  style,
  placeholder
}) {
  return render(INPUT_TYPE.TextArea, {
    type,
    caption,
    value,
    onChange,
    placeholder,
    validationStatus,
    style
  });
}

function CheckBox({ label = 'label', checked = false, onChange }) {
  const id = React.useMemo(() => uuidv1(), []);

  function render() {
    return (
      <div className="flex items-center checkbox-container">
        <input
          className="rounded text-white  border-gray-800 p-2
          border-2 outline-none focus:border-purple-700"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => {
            if (onChange) {
              onChange(e.target.checked);
            }
          }}
        />
        <label className="select-none pl-1 leading-tight" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }

  return render();
}

export { Input, TextArea, CheckBox };
