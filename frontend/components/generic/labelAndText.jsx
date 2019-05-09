/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../helpers';

const LabelAndText = (props) => {
  const {
    type, label, value,
  } = props;
  const id = `${type}.${label}`;

  const formattedTypes = {
    select: () => props.options.find(o => o.value === value).label,
    date: () => formatDate(value),
  };

  const formattedValue = formattedTypes[type] ? formattedTypes[type]() : value;

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
      </label>
      <label className="form-control" id={id}>
        {formattedValue}
      </label>
    </div>
  );
};

LabelAndText.propTypes = {
  type: PropTypes.oneOf(['select', 'number', 'text', 'textarea', 'password', 'date', 'mail']).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
};

LabelAndText.defaultProps = {
  options: [],
};

export default LabelAndText;
