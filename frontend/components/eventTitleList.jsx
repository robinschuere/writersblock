import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatStorySetting, formatGenericValueTypes, calculateTitles } from '../helpers';

import { getEventTitlesByEvent } from '../reducers/eventTitle';
import List from './generic/list';

const EventTitleList = ({
  onAdd, onRemove, i18n, mobile, eventTitleStore,
  storySettingStore, eventId, characterId, growth, eventStore,
}) => {
  const eventTitles = growth
    ? calculateTitles(eventTitleStore, eventStore, characterId, eventId)
    : getEventTitlesByEvent(eventTitleStore, eventId);

  return (
    <Fragment>
      <List
        noSearch
        noView={growth}
        onAdd={!growth && onAdd}
        onRemove={!growth && onRemove}
        i18n={i18n}
        mobile={mobile}
        linkToPath={`${eventId}/eventTitles`}
        columns={[
          { columnName: i18n.t('generic.name'), fieldName: 'storySettingId', format: formatStorySetting(storySettingStore) },
          { columnName: i18n.t('generic.type'), fieldName: 'eventTitleType', format: formatGenericValueTypes },
        ]}
        items={eventTitles}
      />
    </Fragment>
  );
};

EventTitleList.propTypes = {
  characterId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventTitleStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  growth: PropTypes.bool.isRequired,
};

export default EventTitleList;
