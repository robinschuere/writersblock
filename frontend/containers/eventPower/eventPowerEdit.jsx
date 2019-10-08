import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alphabeticalSort, getEventPowerTypeOptions, useField } from '../../helpers';
import { updateEventPower, addEventPower } from '../../actions/eventPower';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndSaveBar from '../../components/backAndSaveBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';

const EventPowerEdit = ({
  computedMatch, eventStore, eventPowerStore, powerStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventPowerId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventPower = eventPowerStore[eventPowerId] || {};
  const powers = Object.keys(powerStore)
    .map(key => ({
      ...powerStore[key],
      value: key,
      label: powerStore[key].name,
    }))
    .filter(c => c.storyId === storyId)
    .sort(alphabeticalSort);

  const [updatedEventPower, setEventPowerProps] = useField(eventPower);

  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);

  const validate = () => {
    if ([updatedEventPower.powerId, updatedEventPower.eventPowerType].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedEventPower.id) {
        await updateEventPower(updatedEventPower, dispatch);
      } else {
        await addEventPower({ ...updatedEventPower, storyId, eventId }, dispatch);
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
        {showAlert && <Alert message={i18n.t('eventPower.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('eventPower.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={powers} label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setEventPowerProps('powerId')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getEventPowerTypeOptions(i18n)} label={i18n.t('generic.type')} placeholder={i18n.t('generic.placeholders.type')} {...setEventPowerProps('eventPowerType')} />
        </form>
      </div>
    </Fragment>
  );
};

EventPowerEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventPowerStore: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventPowerEdit);
