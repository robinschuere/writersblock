/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackAndEditBar = props => (
  <BackAndActionBar
    {...props}
    acceptText={props.i18n.t('generic.edit')}
    acceptIcon="pencil-alt"
  />
);

BackAndEditBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndEditBar;
