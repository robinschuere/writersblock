import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  id, value, onChange, onBlur, placeholder, amountOfRows, readOnly,
}) => {
  const handleInputChange = (e) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }
  };
  return (
    <textarea
      className="form-control"
      id={id}
      defaultValue={value}
      onChange={handleInputChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={amountOfRows}
      readOnly={readOnly}
    />
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  amountOfRows: PropTypes.number,
  readOnly: PropTypes.bool,
};

TextArea.defaultProps = {
  value: undefined,
  onBlur: undefined,
  placeholder: 'Insert some text',
  amountOfRows: 5,
  readOnly: false,
};

export default TextArea;
