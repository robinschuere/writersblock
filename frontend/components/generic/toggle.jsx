import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({
  onChange, value, options, readOnly, name,
}) => (
  <div className="btn-group btn-group-toggle float-right" data-toggle="buttons">
    {options.map(o => (
      <label id={o.value} className={`btn btn-secondary ${o.value === value ? 'active' : ''}`}>
        <input
          autoComplete="off"
          type="radio"
          name={`${name}.${o.value}`}
          id={`${name}.${o.value}`}
          checked={o.value === value}
          readOnly={readOnly}
          onClick={() => onChange(o.value)}
        />
        {o.label}
      </label>
    ))}
  </div>
);

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

Toggle.defaultProps = {
  readOnly: false,
};

export default Toggle;
