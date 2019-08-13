import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from './generic/button';

const BackAndSaveBar = ({
  onClose, onAccept, i18n, mobile,
}) => (
  <Fragment>
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className="navbar navbar-dark bg-dark">
        <Button secondary size={mobile ? 'md' : 'sm'} icon="times" color="black" onClick={onClose}>{!mobile && i18n.t('generic.back')}</Button>
        <Button secondary size={mobile ? 'md' : 'sm'} icon="save" color="white" toRight onClick={onAccept}>{!mobile && i18n.t('generic.save')}</Button>
      </nav>
    </div>
    <div style={{ marginTop: 25 }} />
  </Fragment>
);

BackAndSaveBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default BackAndSaveBar;
