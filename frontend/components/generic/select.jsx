import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  options, id, value, onChange,
}) => (
  <select
    className="form-control"
    id={id}
    defaultValue={value}
    onChange={(e) => { onChange(parseInt(e.target.value, 10)); }}
  >
    {options.map(option => (
      <option
        value={option.value}
        key={`select.options.${value}`}

      >
        {option.label}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;