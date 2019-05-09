import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
  value, onChange, id, maxLength, placeholder, readOnly,
}) => {
  const handleBlurChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(btoa(e.target.value));
    }
  };
  return (
    <input
      type="password"
      className="form-control"
      defaultValue={readOnly ? '**************************' : value}
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
};

PasswordInput.defaultProps = {
  maxLength: 150,
  placeholder: 'Enter a password',
  readOnly: false,
};

export default PasswordInput;
