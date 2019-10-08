import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from './generic/button';

const BackAndActionBar = ({
  onClose, onAccept, mobile, acceptText, acceptIcon, closeIcon, closeText,
}) => (
  <Fragment>
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className="navbar navbar-dark bg-dark">
        <Button secondary size="md" icon={closeIcon} color="black" onClick={onClose}>{!mobile && closeText}</Button>
        {onAccept && <Button secondary size="md" icon={acceptIcon} color="white" toRight onClick={onAccept}>{!mobile && acceptText}</Button>}
      </nav>
    </div>
    <div style={{ marginTop: 25 }} />
  </Fragment>
);

BackAndActionBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
  acceptText: PropTypes.string.isRequired,
  acceptIcon: PropTypes.string.isRequired,
  closeText: PropTypes.string.isRequired,
  closeIcon: PropTypes.string.isRequired,
};

export default BackAndActionBar;
