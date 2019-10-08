import React from 'react';
import PropTypes from 'prop-types';
import ReactDropDownSelect from 'react-dropdown-select';

import { isMobile } from '../../helpers';

const Select = ({
  options, id, value, onChange, readOnly, placeholder, position,
}) => {
  const selectedValues = options.filter(f => f.value === value);
  const optionsWithPlaceholder = [{ value: '', label: placeholder }, ...options];


  const handleChange = (newValues) => {
    if (!onChange) {
      return;
    }
    if (Array.isArray(newValues) && newValues.length === 1) {
      onChange(newValues[0].value);
    }
  };

  if (isMobile()) {
    return (
      <select
        className="form-control"
        key={id}
        defaultValue={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={readOnly}
        readOnly={readOnly}
        placeholder={placeholder}
      >
        {optionsWithPlaceholder.map(option => (
          <option
            value={option.value}
            key={`select.options.${option.value}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <ReactDropDownSelect
      dropdownPosition={position}
      className="form-control"
      values={selectedValues}
      key={id}
      readOnly={readOnly}
      disabled={readOnly}
      options={optionsWithPlaceholder}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  position: PropTypes.string,
};

Select.defaultProps = {
  readOnly: false,
  value: undefined,
  placeholder: 'UNKNOWN',
  position: 'bottom',
};

export default Select;
