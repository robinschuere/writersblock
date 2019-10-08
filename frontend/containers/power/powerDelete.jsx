import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removePower } from '../../actions/power';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const Power = ({
  computedMatch, powerStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, powerId } = computedMatch.params;
  const power = powerStore[powerId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removePower(power, dispatch);
    setCompleted(true);
  };

  if (completed || !power) {
    return <Redirect to={`/stories/${storyId}/powers`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container-fluid">
        <h4>{i18n.t('power.delete.header', { title: power.name })}</h4>
        <p>{i18n.t('power.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Power.propTypes = {
  dispatch: PropTypes.func.isRequired,
  powerStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(Power);
