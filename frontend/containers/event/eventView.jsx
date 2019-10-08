import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import { alphabeticalSort, counterSort } from '../../helpers';

import WithNavBar from '../../components/hoc/withNavBar';
import { constants } from '../../constants';
import StorySettingListSelect from '../../components/storySettingListSelect';
import Tabs from '../../components/generic/tabs';
import EventItemList from '../../components/eventItemList';
import EventPowerList from '../../components/eventPowerList';
import EventTitleList from '../../components/eventTitleList';
import EventRelationList from '../../components/eventRelationList';
import BackAndEditBar from '../../components/backAndEditBar';
import LabelAndText from '../../components/generic/labelAndText';

const EventEdit = (props) => {
  const {
    computedMatch, characterStore, chapterStore, eventStore,
    i18n, mobile, history, withAuthorDescription, navigationStore,
  } = props;
  const {
    storyId, storyRoute, parentId, eventId,
  } = computedMatch.params;
  const { path } = computedMatch;

  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('event.view.tabs.personal'));
  const [completed, setCompleted] = useState(false);

  const getParent = () => {
    switch (storyRoute) {
      case `${constants.storyRoutes.chapters}`:
        return {
          options: Object.keys(characterStore)
            .filter(key => characterStore[key].storyId === storyId)
            .map(key => ({
              value: characterStore[key].id,
              label: `${characterStore[key].firstName} ${characterStore[key].lastName}`,
            }))
            .sort(alphabeticalSort),
          parentFieldName: 'chapterId',
          childLabel: i18n.t('generic.character'),
          childPlaceHolder: i18n.t('generic.placeholders.character'),
          childFieldName: 'characterId',
          isCharacter: false,
        };
      case `${constants.storyRoutes.characters}`:
        return {
          options: Object.keys(chapterStore)
            .filter(key => chapterStore[key].storyId === storyId)
            .map(key => ({
              value: chapterStore[key].id,
              label: chapterStore[key].title,
            }))
            .sort(counterSort),
          parentFieldName: 'characterId',
          childLabel: i18n.t('generic.chapter'),
          childPlaceHolder: i18n.t('generic.placeholders.chapter'),
          childFieldName: 'chapterId',
          isCharacter: true,
        };
      default:
        throw new Error('type is not defined yet');
    }
  };

  const parent = getParent();
  const event = eventStore[eventId];

  const handleChange = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/edit`);
  };

  const handleAddItem = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventItems/new`);
  };

  const handleRemoveItem = (item) => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventItems/${item.id}/delete`);
  };

  const handleAddPower = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventPowers/new`);
  };

  const handleRemovePower = (item) => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventPowers/${item.id}/delete`);
  };

  const handleAddTitle = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventTitles/new`);
  };

  const handleRemoveTitle = (item) => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventTitles/${item.id}/delete`);
  };

  const handleAddRelation = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventRelations/new`);
  };

  const handleRemoveRelation = (item) => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}/eventRelations/${item.id}/delete`);
  };

  // const characterId = parent.isCharacter ? parentId : event[parent.childFieldName];

  if (completed) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}`} />;
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
          <h5>{i18n.t('event.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={event.name} />
          <LabelAndText options={parent.options} type="select" value={event[parent.childFieldName]} />
          <LabelAndText min={1} type="number" label={i18n.t('generic.counter')} value={event.counter} />
          {withAuthorDescription && (
            <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} value={event.authorDescription} />
          )}
          <LabelAndText type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} value={event.description} />
          <Tabs
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('event.view.tabs.personal'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="personal" values={event.personalTraits} /> },
              { tabName: i18n.t('event.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={event.statisticTraits} /> },
              { tabName: i18n.t('event.view.tabs.items'), render: () => <EventItemList {...props} eventId={eventId} onAdd={handleAddItem} onRemove={handleRemoveItem} /> },
              { tabName: i18n.t('event.view.tabs.powers'), render: () => <EventPowerList {...props} eventId={eventId} onAdd={handleAddPower} onRemove={handleRemovePower} /> },
              { tabName: i18n.t('event.view.tabs.titles'), render: () => <EventTitleList {...props} eventId={eventId} onAdd={handleAddTitle} onRemove={handleRemoveTitle} /> },
              { tabName: i18n.t('event.view.tabs.relations'), render: () => <EventRelationList {...props} eventId={eventId} onAdd={handleAddRelation} onRemove={handleRemoveRelation} /> },
            ]}
          />
        </form>
      </div>
    </Fragment>
  );
};

EventEdit.propTypes = {
  withAuthorDescription: PropTypes.bool.isRequired,
  chapterStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(EventEdit));
