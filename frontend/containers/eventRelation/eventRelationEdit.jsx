import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateEventRelation, addEventRelation } from '../../actions/eventRelation';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndSaveBar from '../../components/backAndSaveBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';
import { alphabeticalSort, getOptionsFromStorySetting, useField } from '../../helpers';

const EventRelationEdit = ({
  computedMatch, eventStore, eventRelationStore,
  dispatch, i18n, mobile, characterStore, storySettingStore,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventRelationId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventRelation = eventRelationStore[eventRelationId] || {};
  const characters = Object.keys(characterStore)
    .filter(key => characterStore[key].storyId === storyId)
    .map(key => ({
      value: key,
      label: `${characterStore[key].firstName} ${characterStore[key].lastName}`,
    }))
    .sort(alphabeticalSort);
  const relationTypes = getOptionsFromStorySetting(storySettingStore, storyId, 'relationType', i18n);

  const [updatedEventRelation, setEventRelationProps] = useField(eventRelation);

  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);

  const validate = () => {
    if ([
      updatedEventRelation.characterId,
      updatedEventRelation.relationType,
    ].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedEventRelation.id) {
        await updateEventRelation(updatedEventRelation, dispatch);
      } else {
        await addEventRelation({ ...updatedEventRelation, storyId, eventId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/${storyRoute}/${parentId}/events/${eventId}`} />;
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
        {showAlert && <Alert message={i18n.t('eventRelation.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('eventRelation.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndText type="select" options={characters} label={i18n.t('generic.parent')} value={event.characterId} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={characters} label={i18n.t('generic.relation')} placeholder={i18n.t('generic.placeholders.relation')} {...setEventRelationProps('characterId')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={relationTypes} label={i18n.t('generic.type')} placeholder={i18n.t('generic.placeholders.type')} {...setEventRelationProps('relationType')} />
          <LabelAndField validatedOnce={validatedOnce} type="number" label={i18n.t('generic.level')} placeholder={i18n.t('generic.placeholders.level')} {...setEventRelationProps('level')} />
        </form>
      </div>
    </Fragment>
  );
};

EventRelationEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventRelationStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventRelationEdit);
