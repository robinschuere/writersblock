/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

import BackAndActionBar from './backAndActionBar';

const BackAndImportBar = props => (
  <BackAndActionBar
    {...props}
    acceptText={props.i18n.t('generic.import.action')}
    acceptIcon="file-import"
  />
);

BackAndImportBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndImportBar;
