import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ fieldLabel, id, level }) => (
  <label htmlFor={id}>
    {!level && fieldLabel}
    {level && (<span className={`badge badge-${level}`}>{fieldLabel}</span>)}
  </label>
);

Label.propTypes = {
  fieldLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string,
  level: PropTypes.oneOf(['warning', 'info']),
};

Label.defaultProps = {
  level: undefined,
  id: undefined,
};

export default Label;
