import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  value, onBlur, id, readOnly,
}) => {
  const handleBlurChange = (e) => {
    if (onBlur) {
      e.preventDefault();
      onBlur(e.target.value);
    }
  };
  return (
    <input
      type="date"
      className="form-control"
      defaultValue={value}
      onBlur={handleBlurChange}
      id={id}
      readOnly={readOnly}
    />
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

DateInput.defaultProps = {
  readOnly: false,
};


export default DateInput;
