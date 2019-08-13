import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({
  fileTypes, id, onChange, multiple,
}) => {
  const handleOnChange = (e) => {
    if (multiple) {
      onChange(e.target.files);
    } else {
      onChange(e.target.files[0]);
    }
  };

  return (
    <input
      id={id}
      type="file"
      accept={fileTypes}
      onChange={handleOnChange}
      multiple={multiple}
    />
  );
};

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  fileTypes: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

FileInput.defaultProps = {
  multiple: false,
};

export default FileInput;
