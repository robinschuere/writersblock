import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removePlace } from '../../actions/place';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const Place = ({
  computedMatch, placeStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, placeId } = computedMatch.params;
  const place = placeStore[placeId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removePlace(place, dispatch);
    setCompleted(true);
  };

  if (completed || !place) {
    return <Redirect to={`/stories/${storyId}/places`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container-fluid">
        <h4>{i18n.t('place.delete.header', { title: place.name })}</h4>
        <p>{i18n.t('place.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Place.propTypes = {
  dispatch: PropTypes.func.isRequired,
  placeStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(Place);
