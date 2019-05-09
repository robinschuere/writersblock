import React from 'react';
import PropTypes from 'prop-types';

const MailInput = ({
  value, onChange, id, placeholder, maxLength, readOnly,
}) => {
  const handleInputChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }
  };

  return (
    <input
      type="mail"
      className="form-control"
      defaultValue={value}
      onChange={handleInputChange}
      id={id}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
    />
  );
};

MailInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
};

MailInput.defaultProps = {
  placeholder: 'Insert an email address',
  maxLength: 150,
  readOnly: false,
};

export default MailInput;
