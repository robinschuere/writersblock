import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getEventTitleTypeOptions, getOptionsFromStorySetting, useField } from '../../helpers';
import { updateEventTitle, addEventTitle } from '../../actions/eventTitle';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndSaveBar from '../../components/backAndSaveBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';

const EventTitleEdit = ({
  computedMatch, eventStore, eventTitleStore, storySettingStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventTitleId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventTitle = eventTitleStore[eventTitleId] || {};
  const titles = getOptionsFromStorySetting(storySettingStore, storyId, 'title', i18n, ['character']);

  const [updatedEventTitle, setEventTitleProps] = useField(eventTitle);

  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);

  const validate = () => {
    if ([
      updatedEventTitle.storySettingId,
      updatedEventTitle.eventTitleType,
    ].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedEventTitle.id) {
        await updateEventTitle(updatedEventTitle, dispatch);
      } else {
        await addEventTitle({ ...updatedEventTitle, storyId, eventId }, dispatch);
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
        {showAlert && <Alert message={i18n.t('eventTitle.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('eventTitle.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={event.name} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={titles} label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setEventTitleProps('storySettingId')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getEventTitleTypeOptions(i18n)} label={i18n.t('generic.type')} placeholder={i18n.t('generic.placeholders.type')} {...setEventTitleProps('eventTitleType')} />
        </form>
      </div>
    </Fragment>
  );
};

EventTitleEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventTitleStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventTitleEdit);
