import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeEvent } from '../actions/event';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const EventDelete = ({
  computedMatch, eventStore, dispatch, i18n,
}) => {
  const {
    storyId, eventId, storyRoute, parentId,
  } = computedMatch.params;
  const event = eventStore[eventId];

  const [completed, setCompleted] = useState(false);

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeEvent(event, dispatch);
    handleClose();
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('event.delete.header', { title: event.name })}</h4>
        <p>{i18n.t('event.delete.message')}</p>
      </div>
    </Fragment>
  );
};

EventDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(EventDelete);
