import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
  value, onChange, id, maxLength, placeholder, readOnly, onEnter,
}) => {
  const handleBlurChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(btoa(e.target.value));
    }
  };

  const handleKeyUp = onEnter ? (e) => {
    if (e.keyCode === 13) {
      handleBlurChange(e);
      onEnter();
    }
  } : undefined;

  return (
    <input
      type="password"
      className="form-control"
      defaultValue={readOnly ? '**************************' : value}
      onKeyUp={handleKeyUp}
      onBlur={handleBlurChange}
      id={id}
      maxLength={maxLength}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  onEnter: PropTypes.func,
};

PasswordInput.defaultProps = {
  maxLength: 150,
  placeholder: 'Enter a password',
  readOnly: false,
  onEnter: undefined,
};

export default PasswordInput;
