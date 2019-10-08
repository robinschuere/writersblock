import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alphabeticalSort, getEventItemTypeOptions, useField } from '../../helpers';
import { updateEventItem, addEventItem } from '../../actions/eventItem';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndSaveBar from '../../components/backAndSaveBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';

const EventItemEdit = ({
  computedMatch, eventStore, eventItemStore, itemStore, dispatch, i18n, mobile,
}) => {
  const {
    storyId, storyRoute, parentId, eventId, eventItemId,
  } = computedMatch.params;
  const event = eventStore[eventId];
  const eventItem = eventItemStore[eventItemId] || {};
  const items = Object.keys(itemStore)
    .map(key => ({
      ...itemStore[key],
      value: key,
      label: itemStore[key].name,
    }))
    .filter(c => c.storyId === storyId)
    .sort(alphabeticalSort);

  const [updatedEventItem, setEventItemProps] = useField(eventItem);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);

  const validate = () => {
    if ([updatedEventItem.itemId, updatedEventItem.eventItemType].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedEventItem.id) {
        await updateEventItem(updatedEventItem, dispatch);
      } else {
        await addEventItem({ ...updatedEventItem, storyId, eventId }, dispatch);
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
        {showAlert && <Alert message={i18n.t('eventItem.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('eventItem.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.event')} value={event.name} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={items} label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setEventItemProps('itemId')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getEventItemTypeOptions(i18n)} label={i18n.t('generic.type')} placeholder={i18n.t('generic.placeholders.type')} {...setEventItemProps('eventItemType')} />
        </form>
      </div>
    </Fragment>
  );
};

EventItemEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(EventItemEdit);
