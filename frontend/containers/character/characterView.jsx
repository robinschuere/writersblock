import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { getEventsByCharacter } from '../../reducers/event';
import { constants } from '../../constants';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import StorySettingLabel from '../../components/storySettingLabel';
import EventList from '../../components/eventList';
import BackAndEditBar from '../../components/backAndEditBar';
import Button from '../../components/generic/button';
import { getEventItemsByEvent } from '../../reducers/eventItem';
import { getEventPowersByEvent } from '../../reducers/eventPower';
import { getEventTitlesByEvent } from '../../reducers/eventTitle';
import { getEventRelationsByEvent } from '../../reducers/eventRelation';

const Character = (props) => {
  const {
    computedMatch, characterStore, eventStore, withAuthorDescription,
    history, i18n, mobile, eventItemStore, eventRelationStore, eventTitleStore, eventPowerStore,
  } = props;
  const { storyId, characterId } = computedMatch.params;
  const character = characterStore[characterId];
  const [completed, setCompleted] = useState(false);

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/edit`);
  };

  const handleGrowth = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/growth`);
  };

  const handleClose = () => {
    setCompleted(true);
  };

  if (completed || !character) {
    return <Redirect to={`/stories/${storyId}/characters`} />;
  }

  const events = getEventsByCharacter(eventStore, characterId)
    .map(e => ({
      ...e,
      items: getEventItemsByEvent(eventItemStore, e.id),
      powers: getEventPowersByEvent(eventPowerStore, e.id),
      titles: getEventTitlesByEvent(eventTitleStore, e.id),
      relations: getEventRelationsByEvent(eventRelationStore, e.id),
    }));

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onClose={handleClose}
        i18n={i18n}
        onAccept={handleChangeCharacter}
      />
      <div className="container-fluid">
        <form className="form-horizontal">
          <h5>{i18n.t('character.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('character.firstname')} value={character.firstName} />
          <LabelAndText type="text" label={i18n.t('character.lastname')} value={character.lastName} />
          {withAuthorDescription && (
            <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={character.authorDescription} />
          )}
          <StorySettingLabel {...props} storyId={storyId} type="race" value={character.race} />
          <StorySettingLabel {...props} storyId={storyId} type="gender" value={character.gender} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={character.description} />
        </form>
        <Button onClick={handleGrowth} icon="chart-pie">{i18n.t('')}</Button>
        <EventList
          {...props}
          storyRoute={constants.storyRoutes.characters}
          parentId={characterId}
          events={events}
        />
      </div>
    </Fragment>
  );
};

Character.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventTitleStore: PropTypes.object.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  eventPowerStore: PropTypes.object.isRequired,
  eventRelationStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Character));
