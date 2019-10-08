/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackBar = props => (
  <BackAndActionBar
    {...props}
    closeIcon="arrow-circle-left"
    closeText={props.i18n.t('generic.back')}
  />
);

BackBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackBar;
