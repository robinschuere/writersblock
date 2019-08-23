/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackAndSaveBar = props => (
  <BackAndActionBar
    {...props}
    acceptText={props.i18n.t('generic.save')}
    acceptIcon="save"
  />
);

BackAndSaveBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndSaveBar;
