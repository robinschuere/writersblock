import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeEventPower } from '../../actions/eventPower';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const EventPowerDelete = ({
  computedMatch, eventPowerStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, eventId, storyRoute, parentId, eventPowerId,
  } = computedMatch.params;
  const event = eventPowerStore[eventPowerId];

  const [completed, setCompleted] = useState(false);

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeEventPower(event, dispatch);
    setCompleted(true);
  };

  if (completed || !event) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar
        mobile={mobile}
        onAccept={handleDelete}
        onClose={handleClose}
        i18n={i18n}
      />
      <div className="container-fluid">
        <h4>{i18n.t('eventPower.delete.header', { title: event.name })}</h4>
        <p>{i18n.t('eventPower.delete.message')}</p>
      </div>
    </Fragment>
  );
};

EventPowerDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventPowerStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventPowerDelete);
