import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { updateEvent } from '../../actions/event';

import {
  getEventsByCharacter,
} from '../../reducers/event';
import {
  formatCharacter, counterSort, calculateTraits,
} from '../../helpers';

import BackBar from '../../components/backBar';
import LabelAndText from '../../components/generic/labelAndText';
import LabelAndField from '../../components/generic/labelAndField';
import StorySettingListSelect from '../../components/storySettingListSelect';
import WithNavBar from '../../components/hoc/withNavBar';
import Tabs from '../../components/generic/tabs';
import EventItemList from '../../components/eventItemList';
import EventPowerList from '../../components/eventPowerList';
import EventTitleList from '../../components/eventTitleList';
import EventItemSetup from '../../components/eventItemSetup';
import EventRelationList from '../../components/eventRelationList';

const CharacterGrowth = (props) => {
  const {
    eventStore, characterStore, computedMatch, mobile, dispatch,
    i18n,
  } = props;
  const { storyId, characterId } = computedMatch.params;
  const formatPerson = formatCharacter(characterStore);
  const events = getEventsByCharacter(eventStore, characterId);
  const eventOptions = events
    .map(k => ({
      label: `${k.counter}: ${k.name}`,
      value: k.id,
      counter: k.counter,
    }))
    .sort(counterSort);

  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(i18n.t('growth.tabs.personal'));
  const [eventId, setEventId] = useState(undefined);
  const event = eventStore[eventId];

  const handleSetupChange = async (slotId, value) => {
    const updatedEvent = { ...event };
    updatedEvent.setup[slotId] = value;
    await updateEvent(updatedEvent, dispatch);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/characters/${characterId}`} />;
  }

  return (
    <Fragment>
      <BackBar
        mobile={mobile}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        <LabelAndText type="text" label={i18n.t('generic.parent')} value={formatPerson(characterId)} />
        <LabelAndField type="select" label={i18n.t('generic.event')} placeholder={i18n.t('generic.placeholders.event')} value={eventId} onChange={setEventId} options={eventOptions} />
        {eventId && (
          <Tabs
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('growth.tabs.personal'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="character" type="trait" subType="personal" values={calculateTraits(eventStore, characterId, eventId, 'personalTraits')} /> },
              { tabName: i18n.t('growth.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="character" type="trait" subType="statistic" values={calculateTraits(eventStore, characterId, eventId, 'statisticTraits')} /> },
              { tabName: i18n.t('growth.tabs.items'), render: () => <EventItemList {...props} growth eventId={eventId} characterId={characterId} /> },
              { tabName: i18n.t('growth.tabs.powers'), render: () => <EventPowerList {...props} growth eventId={eventId} characterId={characterId} /> },
              { tabName: i18n.t('growth.tabs.titles'), render: () => <EventTitleList {...props} growth eventId={eventId} characterId={characterId} /> },
              { tabName: i18n.t('growth.tabs.relations'), render: () => <EventRelationList {...props} growth eventId={eventId} characterId={characterId} /> },
              { tabName: i18n.t('growth.tabs.setup'), render: () => <EventItemSetup {...props} storyId={storyId} event={event} onChange={handleSetupChange} /> },
            ]}
          />
        )}
      </div>
    </Fragment>
  );
};

CharacterGrowth.propTypes = {
  eventStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(CharacterGrowth));
