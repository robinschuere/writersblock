import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { updateEvent, addEvent } from '../../actions/event';
import { alphabeticalSort } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import constants from '../../constants';

const EventEdit = ({
  computedMatch, chapterStore, characterStore, dispatch, i18n, eventStore, mobile,
}) => {
  const {
    storyId, storyRoute, parentId, eventId,
  } = computedMatch.params;

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
        };
      case `${constants.storyRoutes.characters}`:
        return {
          options: Object.keys(chapterStore)
            .filter(key => chapterStore[key].storyId === storyId)
            .map(key => ({
              value: chapterStore[key].id,
              label: chapterStore[key].title,
            }))
            .sort((a, b) => a.counter - b.counter),
          parentFieldName: 'characterId',
          childLabel: i18n.t('generic.chapter'),
          childPlaceHolder: i18n.t('generic.placeholders.chapter'),
          childFieldName: 'chapterId',
        };
      default:
        throw new Error('type is not defined yet');
    }
  };

  const parent = getParent();
  const event = !eventId ? {
    [parent.parentFieldName]: parentId,
  } : eventStore[eventId];

  const [name, setName] = useState(event.name);
  const [childId, setChildId] = useState(event[parent.childFieldName]);
  const [authorDescription, setAuthorDescription] = useState(event.authorDescription);
  const [description, setDescription] = useState(event.description);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateEvent = () => {
    const fieldsToCheck = [parentId, name];

    if (storyRoute === constants.objects.chapter) {
      fieldsToCheck.push(childId);
    }

    if (fieldsToCheck.filter(x => x).length !== fieldsToCheck.length) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateEvent()) {
      const updatedEvent = {
        ...event,
        name,
        authorDescription,
        description,
        [parent.parentFieldName]: parentId,
        [parent.childFieldName]: childId,
      };
      if (updatedEvent.id) {
        await updateEvent(updatedEvent, dispatch);
      } else {
        await addEvent({ ...updatedEvent, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
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
      <div className="container">
        {showAlert && <Alert message={i18n.t('event.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('event.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} required={storyRoute === constants.storyRoutes.chapters} options={parent.options} type="select" label={parent.childLabel} placeholder={parent.childPlaceHolder} onChange={setChildId} value={childId} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

EventEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chapterStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventEdit);
