import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from './generic/button';

const BackAndActionBar = ({
  onClose, onAccept, i18n, mobile, acceptText, acceptIcon,
}) => (
  <Fragment>
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Button secondary size={mobile ? 'md' : 'sm'} icon="times" color="black" onClick={onClose}>{!mobile && i18n.t('generic.back')}</Button>
        <Button secondary size={mobile ? 'md' : 'sm'} icon={acceptIcon} color="white" toRight onClick={onAccept}>{!mobile && acceptText}</Button>
      </nav>
    </div>
    <div style={{ marginTop: 25 }} />
  </Fragment>
);

BackAndActionBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  acceptText: PropTypes.string.isRequired,
  acceptIcon: PropTypes.string.isRequired,
};

export default BackAndActionBar;
