import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import StorySettingLabel from '../../components/storySettingLabel';
import StorySettingListSelect from '../../components/storySettingListSelect';
import EventList from '../../components/eventList';
import RelationList from '../../components/relationList';
import { getEventsByCharacter } from '../../reducers/event';
import { getRelationsByCharacter } from '../../reducers/relation';
import Tabs from '../../components/generic/tabs';
import constants from '../../constants';
import BackAndEditBar from '../../components/backAndEditBar';

const Character = (props) => {
  const {
    computedMatch, characterStore, eventStore,
    relationStore, storySettingStore, history, i18n, mobile,
  } = props;
  const { storyId, characterId } = computedMatch.params;
  const [activeTab, setActiveTab] = useState(i18n.t('character.view.tabs.personal'));
  const character = characterStore[characterId];

  const [completed, setCompleted] = useState(false);

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/edit`);
  };

  const handleClose = () => {
    setCompleted(true);
  };

  if (completed || !character) {
    return <Redirect to={`/stories/${storyId}/characters`} />;
  }

  const events = getEventsByCharacter(eventStore, characterId);
  const relations = getRelationsByCharacter(relationStore, characterId);

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onClose={handleClose}
        i18n={i18n}
        onAccept={handleChangeCharacter}
      />
      <div className="container">
        <form className="form-horizontal">
          <h5>Character information</h5>
          <LabelAndText type="text" label={i18n.t('character.firstname')} value={character.firstName} />
          <LabelAndText type="text" label={i18n.t('character.lastname')} value={character.lastName} />
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={character.authorDescription} />
          <StorySettingLabel storyId={storyId} type="race" i18n={i18n} storySettingStore={storySettingStore} value={character.race} />
          <StorySettingLabel storyId={storyId} type="gender" i18n={i18n} storySettingStore={storySettingStore} value={character.gender} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={character.description} />
        </form>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('character.view.tabs.personal'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="character" type="trait" subType="personal" values={character.personalTraits} /> },
            { tabName: i18n.t('character.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="character" type="trait" subType="statistic" values={character.statisticTraits} /> },
            { tabName: i18n.t('character.view.tabs.events'), render: () => <EventList {...props} storyRoute={constants.storyRoutes.characters} parentId={characterId} events={events} /> },
            { tabName: i18n.t('character.view.tabs.relations'), render: () => <RelationList {...props} relations={relations} /> },
          ]}
        />
      </div>
    </Fragment>
  );
};

Character.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  relationStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Character));
