/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { formatDate } from '../../helpers';
import Label from './label';
import TextArea from './textArea';

const LabelAndText = (props) => {
  const {
    type, label, value, isMarkDown, multi, options,
  } = props;
  const id = `${type}.${label}`;

  const formattedTypes = {
    toggle: () => (props.options.find(o => o.value === value) ? props.options.find(o => o.value === value).label : '-'),
    select: () => (props.options.find(o => o.value === value) ? props.options.find(o => o.value === value).label : '-'),
    date: () => (value ? formatDate(value) : '-'),
    textarea: () => value || '-',
    text: () => value || '-',
    number: () => value || '-',
  };

  const formattedValue = formattedTypes[type] ? formattedTypes[type]() : value;

  const renderValues = () => {
    if (multi) {
      const values = options
        .filter(f => value.includes(f.value))
        .map(f => (<Label id={id} fieldLabel={f.label} level="primary" />));
      return (
        <div className="form-control">
          <h4>
            {values}
          </h4>
        </div>
      );
    }
    if (!isMarkDown && type === 'textarea') {
      return (<TextArea readOnly value={value || '-'} />);
    }
    return isMarkDown
      ? (<div className="form-control" id={id}><ReactMarkdown source={formattedValue} /></div>)
      : (<section className="form-control" id={id}>{formattedValue}</section>);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
      </label>
      {renderValues()}
    </div>
  );
};

LabelAndText.propTypes = {
  type: PropTypes.oneOf(['select', 'number', 'text', 'textarea', 'password', 'date', 'mail', 'toggle']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  isMarkDown: PropTypes.bool,
  multi: PropTypes.bool,
};

LabelAndText.defaultProps = {
  options: [],
  value: undefined,
  isMarkDown: false,
  multi: false,
};

export default LabelAndText;
