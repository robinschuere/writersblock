import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  id, value, onChange, onBlur, placeholder, amountOfRows,
}) => (
  <textarea
    className="form-control"
    id={id}
    defaultValue={value}
    onChange={onChange}
    onBlur={onBlur}
    placeholder={placeholder}
    rows={amountOfRows}
  />
);

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  amountOfRows: PropTypes.number,
};

TextArea.defaultProps = {
  onBlur: undefined,
  placeholder: 'Insert some text',
  amountOfRows: 5,
};

export default TextArea;
