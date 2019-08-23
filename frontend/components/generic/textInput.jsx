import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({
  value, onChange, onBlur, id, placeholder, maxLength, readOnly, style,
}) => {
  const handleInputChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }
  };

  const handleBlurChange = (e) => {
    if (onBlur) {
      e.preventDefault();
      onBlur(e);
    }
  };

  const handleFocus = (e) => {
    e.target.select();
    e.preventDefault();
  };

  return (
    <input
      type="text"
      className="form-control"
      defaultValue={value}
      onChange={handleInputChange}
      onBlur={handleBlurChange}
      onFocus={handleFocus}
      id={id}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
      style={style}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
};

TextInput.defaultProps = {
  value: undefined,
  onBlur: undefined,
  placeholder: 'Insert text',
  maxLength: 50,
  readOnly: false,
  style: undefined,
};

export default TextInput;
