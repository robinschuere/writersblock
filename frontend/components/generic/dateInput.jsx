import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  value, onBlur, id,
}) => (
  <input
    type="date"
    className="form-control"
    defaultValue={value}
    onBlur={onBlur}
    id={id}
  />
);

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};


export default DateInput;
