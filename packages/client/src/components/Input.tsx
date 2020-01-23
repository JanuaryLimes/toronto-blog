import React from 'react';
import uuidv1 from 'uuid/v1';
import { InputType, InputControlProps, CheckboxControlProps } from '../types';

function render(type: InputType, props: InputControlProps) {
  function getValidationStatusClassName() {
    const status = props.validationStatus;
    if (status) {
      if (status === 'is-valid') {
        return 'border-green-600';
      } else if (status === 'is-invalid') {
        return 'border-red-600';
      }
    }
    return 'border-gray-800';
  }

  const inputProps = {
    className: [
      'text-white py-1 px-2 rounded border-2 outline-none', // TODO classnames
      'focus:border-purple-700',
      getValidationStatusClassName()
    ].join(' '),
    value: props.value,
    type: getType(),
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (props?.onChange) {
        props.onChange(e.target.value);
      }
    },
    placeholder: props.placeholder
  };

  function getType() {
    if (props.type === InputType.Input) {
      return 'text';
    }
    return undefined;
  }

  function getInput() {
    switch (type) {
      case InputType.Input:
        return (
          <input
            {...inputProps}
            style={{
              backgroundColor: 'rgb(17, 17, 17)',
              ...props.style
            }}
          />
        );
      case InputType.TextArea:
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

const Input: React.FC<InputControlProps> = ({
  type = InputType.Input,
  caption,
  value,
  onChange,
  validationStatus,
  placeholder
}) => {
  return render(InputType.Input, {
    type,
    caption,
    value,
    onChange,
    validationStatus,
    placeholder
  });
};

const TextArea: React.FC<InputControlProps> = function({
  type = InputType.TextArea,
  caption,
  value,
  onChange,
  validationStatus,
  style,
  placeholder
}) {
  return render(InputType.TextArea, {
    type,
    caption,
    value,
    onChange,
    placeholder,
    validationStatus,
    style
  });
};

const CheckBox: React.FC<CheckboxControlProps> = function({
  label = 'label',
  checked = false,
  onChange
}) {
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
};

export { Input, TextArea, CheckBox };
