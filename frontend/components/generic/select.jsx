import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  options, id, value, onChange, readOnly,
}) => (
  <select
    className="form-control"
    key={id}
    defaultValue={value || ''}
    onChange={e => onChange(e.target.value)}
    disabled={readOnly}
    readOnly={readOnly}
  >
    <option value="" key="empty_key">Select an option</option>
    {options.map(option => (
      <option
        value={option.value}
        key={`select.options.${option.value}`}
      >
        {option.label}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly: PropTypes.bool,
};

Select.defaultProps = {
  readOnly: false,
  value: undefined,
};

export default Select;
