import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  value, onBlur, id,
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
    />
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};


export default DateInput;
