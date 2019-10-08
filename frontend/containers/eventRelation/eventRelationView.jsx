import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndEditBar from '../../components/backAndEditBar';
import LabelAndText from '../../components/generic/labelAndText';
import { alphabeticalSort, getOptionsFromStorySetting } from '../../helpers';

const EventRelationView = ({
  computedMatch, characterStore, eventStore,
  eventRelationStore, i18n, mobile, history, storySettingStore,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventRelationId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventRelation = eventRelationStore[eventRelationId];
  const [completed, setCompleted] = useState(false);
  const characters = Object.keys(characterStore)
    .filter(key => characterStore[key].storyId === storyId)
    .map(key => ({
      value: key,
      label: `${characterStore[key].firstName} ${characterStore[key].lastName}`,
    }))
    .sort(alphabeticalSort);
  const relationTypes = getOptionsFromStorySetting(storySettingStore, storyId, 'relationType', i18n);

  const handleChange = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventRelations/${eventRelationId}/edit`);
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
          <h5>{i18n.t('eventRelation.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndText type="select" options={characters} label={i18n.t('generic.parent')} value={event.characterId} />
          <LabelAndText type="select" options={characters} label={i18n.t('generic.relation')} value={eventRelation.characterId} />
          <LabelAndText type="select" options={relationTypes} label={i18n.t('generic.type')} value={eventRelation.relationType} />
          <LabelAndText type="number" label={i18n.t('generic.level')} value={eventRelation.level} />
        </form>
      </div>
    </Fragment>
  );
};

EventRelationView.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  eventRelationStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(EventRelationView));
