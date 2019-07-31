import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ fieldLabel, id, level }) => (
  <label htmlFor={id}>
    {!level && fieldLabel}
    {level && (<span className={`badge badge-${level}`}>{fieldLabel}</span>)}
  </label>
);

Label.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['warning']),
};

Label.defaultProps = {
  level: undefined,
};

export default Label;
