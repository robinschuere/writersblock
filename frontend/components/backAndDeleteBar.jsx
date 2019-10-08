/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackAndDeleteBar = props => (
  <BackAndActionBar
    {...props}
    acceptText={props.i18n.t('generic.delete')}
    acceptIcon="trash"
    closeIcon="times"
    closeText={props.i18n.t('generic.cancel')}
  />
);

BackAndDeleteBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndDeleteBar;
