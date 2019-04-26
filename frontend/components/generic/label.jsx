import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ fieldLabel, id }) => (
  <label htmlFor={id}>
    {fieldLabel}
  </label>
);

Label.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Label;
