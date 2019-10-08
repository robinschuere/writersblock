import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeEventItem } from '../../actions/eventItem';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const EventItemDelete = ({
  computedMatch, eventItemStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, eventId, storyRoute, parentId, eventItemId,
  } = computedMatch.params;
  const event = eventItemStore[eventItemId];

  const [completed, setCompleted] = useState(false);

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeEventItem(event, dispatch);
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
        <h4>{i18n.t('eventItem.delete.header', { title: event.name })}</h4>
        <p>{i18n.t('eventItem.delete.message')}</p>
      </div>
    </Fragment>
  );
};

EventItemDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventItemDelete);
