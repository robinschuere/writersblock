/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { formatDate } from '../../helpers';

const LabelAndText = (props) => {
  const {
    type, label, value, isMarkDown,
  } = props;
  const id = `${type}.${label}`;

  const formattedTypes = {
    select: () => (props.options.find(o => o.value === value) ? props.options.find(o => o.value === value).label : '-'),
    date: () => (value ? formatDate(value) : '-'),
    textarea: () => value || '-',
    text: () => value || '-',
  };

  const formattedValue = formattedTypes[type] ? formattedTypes[type]() : value;

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
      </label>
      <pre className="form-control" id={id}>{isMarkDown ? <ReactMarkdown source={formattedValue} /> : formattedValue}</pre>
    </div>
  );
};

LabelAndText.propTypes = {
  type: PropTypes.oneOf(['select', 'number', 'text', 'textarea', 'password', 'date', 'mail']).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  isMarkDown: PropTypes.bool,
};

LabelAndText.defaultProps = {
  options: [],
  isMarkDown: false,
};

export default LabelAndText;
