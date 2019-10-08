import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  name, color, size, style,
}) => (
  <i
    style={{ ...style, color }}
    className={`fas fa-${name} fa-${size}`}
  />
);

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', '2x']),
  style: PropTypes.object,
};

Icon.defaultProps = {
  name: '',
  color: 'black',
  size: 'sm',
  style: undefined,
};

export default Icon;
