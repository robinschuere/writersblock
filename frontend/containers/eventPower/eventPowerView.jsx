import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { getEventItemTypeOptions, alphabeticalSort } from '../../helpers';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndEditBar from '../../components/backAndEditBar';
import LabelAndText from '../../components/generic/labelAndText';

const EventPowerView = ({
  computedMatch, itemStore, eventItemStore, i18n, mobile, history, eventStore,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventItemId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventItem = eventItemStore[eventItemId];
  const items = Object.keys(itemStore)
    .map(key => ({
      ...itemStore[key],
      value: key,
      label: itemStore[key].name,
    }))
    .filter(c => c.storyId === storyId)
    .sort(alphabeticalSort);
  const [completed, setCompleted] = useState(false);

  const handleChange = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventItems/${eventItemId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}`} />;
  }

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChange}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        <form className="form-horizontal">
          <h5>{i18n.t('eventItem.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndText type="select" options={items} label={i18n.t('generic.name')} value={eventItem.itemId} />
          <LabelAndText type="select" options={getEventItemTypeOptions(i18n)} label={i18n.t('generic.type')} value={eventItem.eventItemType} />
        </form>
      </div>
    </Fragment>
  );
};

EventPowerView.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(EventPowerView));
