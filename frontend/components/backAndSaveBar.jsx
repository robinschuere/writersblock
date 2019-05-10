import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from './generic/button';

const BackAndSaveBar = ({
  onClose, onAccept,
}) => (
  <Fragment>
    <div style={{ position: 'sticky', top: 0, zIndex: 999 }}>
      <nav className="navbar navbar-dark bg-dark">
        <Button secondary color="black" onClick={onClose}>Back</Button>
        <Button secondary color="white" toRight onClick={onAccept}>Save</Button>
      </nav>
    </div>
    <div style={{ marginTop: 25 }} />
  </Fragment>
);

BackAndSaveBar.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BackAndSaveBar;
