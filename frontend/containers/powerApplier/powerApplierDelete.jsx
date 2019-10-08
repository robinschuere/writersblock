import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removePowerApplier } from '../../actions/powerApplier';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const PowerApplier = ({
  computedMatch, powerApplierStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, powerApplierId } = computedMatch.params;
  const powerApplier = powerApplierStore[powerApplierId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removePowerApplier(powerApplier, dispatch);
    setCompleted(true);
  };

  if (completed || !powerApplier) {
    return <Redirect to={`/stories/${storyId}/powerAppliers`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container-fluid">
        <h4>{i18n.t('powerApplier.delete.header', { title: powerApplier.name })}</h4>
        <p>{i18n.t('powerApplier.delete.message')}</p>
      </div>
    </Fragment>
  );
};

PowerApplier.propTypes = {
  dispatch: PropTypes.func.isRequired,
  powerApplierStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PowerApplier);
