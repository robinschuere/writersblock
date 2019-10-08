import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { getEventTitleTypeOptions, getOptionsFromStorySetting } from '../../helpers';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndEditBar from '../../components/backAndEditBar';
import LabelAndText from '../../components/generic/labelAndText';

const EventTitleView = ({
  computedMatch, storySettingStore, eventTitleStore, i18n, mobile, history, eventStore,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventTitleId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventTitle = eventTitleStore[eventTitleId];
  const titles = getOptionsFromStorySetting(storySettingStore, storyId, 'title', i18n, ['character']);
  const [completed, setCompleted] = useState(false);

  const handleChange = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventTitles/${eventTitleId}/edit`);
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
          <h5>{i18n.t('eventTitle.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndText type="select" options={titles} label={i18n.t('generic.name')} value={eventTitle.storySettingId} />
          <LabelAndText type="select" options={getEventTitleTypeOptions(i18n)} label={i18n.t('generic.type')} value={eventTitle.eventTitleType} />
        </form>
      </div>
    </Fragment>
  );
};

EventTitleView.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  eventTitleStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(EventTitleView));
