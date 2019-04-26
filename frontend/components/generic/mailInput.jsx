import React from 'react';
import PropTypes from 'prop-types';

const MailInput = ({
  value, onChange, id, placeholder, maxLength,
}) => (
  <input
    type="mail"
    className="form-control"
    defaultValue={value}
    onChange={onChange}
    id={id}
    placeholder={placeholder}
    maxLength={maxLength}
  />
);

MailInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};

MailInput.defaultProps = {
  placeholder: 'Insert an email address',
  maxLength: 150,
};

export default MailInput;
