import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({
  value, onChange, id, min, max,
}) => {
  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= min && val <= max) {
      onChange(val);
    } else if (val < min) {
      onChange(min);
    } else if (val > max) {
      onChange(max);
    }
  };

  return (
    <input
      type="number"
      className="form-control"
      defaultValue={value}
      onChange={handleInputChange}
      id={id}
      min={min}
      max={max}
    />
  );
};

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

NumberInput.defaultProps = {
  min: 0,
  max: 100,
};

export default NumberInput;
