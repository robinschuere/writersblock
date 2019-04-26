import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, color }) => <i style={{ color }} className={`fas fa-${name}`} />;

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
  color: 'black',
};

export default Icon;
