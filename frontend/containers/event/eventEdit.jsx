import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import { updateEvent, addEvent } from '../../actions/event';
import {
  alphabeticalSort, updateList, counterSort, useField,
} from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import { constants } from '../../constants';
import StorySettingListSelect from '../../components/storySettingListSelect';
import Tabs from '../../components/generic/tabs';

const EventEdit = (props) => {
  const {
    computedMatch, withAuthorDescription, chapterStore,
    characterStore, dispatch, i18n, eventStore, mobile, navigationStore,
  } = props;
  const {
    storyId, storyRoute, parentId, eventId,
  } = computedMatch.params;
  const { path } = computedMatch;

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
  const event = !eventId ? {
    [parent.parentFieldName]: parentId,
  } : eventStore[eventId];

  const [updatedEvent, setEventFieldProps, setEventField] = useField(event);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('event.edit.tabs.personal'));
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateEvent = () => {
    const fieldsToCheck = [updatedEvent.characterId, updatedEvent.name];

    if (storyRoute === constants.storyRoutes.chapters) {
      fieldsToCheck.push(updatedEvent.chapterId);
    }

    if (fieldsToCheck.filter(x => x).length !== fieldsToCheck.length) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateEvent()) {
      if (updatedEvent.id) {
        await updateEvent(updatedEvent, dispatch);
      } else {
        await addEvent({ ...updatedEvent, setup: {}, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  const handleSetStatisticTrait = (id, level) => {
    const newArray = updateList(updatedEvent.statisticTraits, { id, level });
    setEventField('statisticTraits')(newArray);
  };

  const handleSetPersonalTrait = (id, level) => {
    const newArray = updateList(updatedEvent.personalTraits, { id, level });
    setEventField('personalTraits')(newArray);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('event.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('event.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setEventFieldProps('name')} />
          <LabelAndField validatedOnce={validatedOnce} required={storyRoute === constants.storyRoutes.chapters} options={parent.options} type="select" label={parent.childLabel} placeholder={parent.childPlaceHolder} {...setEventFieldProps(parent.childFieldName)} />
          <LabelAndField validatedOnce={validatedOnce} min={1} type="number" label={i18n.t('generic.counter')} {...setEventFieldProps('counter')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setEventFieldProps('authorDescription')} />
          )}
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setEventFieldProps('description')} />
          <Tabs
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('event.edit.tabs.personal'), render: () => <StorySettingListSelect {...props} storyId={storyId} type="trait" subType="personal" onChange={handleSetPersonalTrait} values={updatedEvent.personalTraits} /> },
              { tabName: i18n.t('event.edit.tabs.statistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} type="trait" subType="statistic" onChange={handleSetStatisticTrait} values={updatedEvent.statisticTraits} /> },
            ]}
          />
        </form>
      </div>
    </Fragment>
  );
};

EventEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  chapterStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(EventEdit));
