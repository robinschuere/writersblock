import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  value, onChange, onBlur, id, placeholder, maxLength,
}) => (
  <input
    type="text"
    className="form-control"
    defaultValue={value}
    onChange={onChange}
    onBlur={onBlur}
    id={id}
    placeholder={placeholder}
    maxLength={maxLength}
  />
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};

TextInput.defaultProps = {
  onBlur: undefined,
  placeholder: 'Insert some text',
  maxLength: 50,
};

export default TextInput;
