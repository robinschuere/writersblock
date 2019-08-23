/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackAndRegisterBar = props => (
  <BackAndActionBar
    {...props}
    acceptText={props.i18n.t('credentials.register')}
    acceptIcon="user"
  />
);

BackAndRegisterBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndRegisterBar;
