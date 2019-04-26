import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name }) => <i className={`glyphicon glyphicon-${name} `} />;

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
};

export default Icon;
