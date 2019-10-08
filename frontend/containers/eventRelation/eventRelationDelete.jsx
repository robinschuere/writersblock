import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeEventRelation } from '../../actions/eventRelation';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const EventRelationDelete = ({
  computedMatch, eventRelationStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, eventId, storyRoute, parentId, eventRelationId,
  } = computedMatch.params;
  const event = eventRelationStore[eventRelationId];

  const [completed, setCompleted] = useState(false);

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeEventRelation(event, dispatch);
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
        <h4>{i18n.t('eventRelation.delete.header', { title: event.name })}</h4>
        <p>{i18n.t('eventRelation.delete.message')}</p>
      </div>
    </Fragment>
  );
};

EventRelationDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventRelationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventRelationDelete);
