import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({
  value, onChange, id, maxLength, placeholder,
}) => (
  <input
    type="password"
    className="form-control"
    defaultValue={value}
    onChange={onChange}
    id={id}
    maxLength={maxLength}
    placeholder={placeholder}
  />
);

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
};

PasswordInput.defaultProps = {
  maxLength: 150,
  placeholder: 'Enter a password',
};

export default PasswordInput;
