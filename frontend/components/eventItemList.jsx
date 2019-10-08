import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatItem, formatGenericValueTypes, calculateItems } from '../helpers';
import { getEventItemsByEvent } from '../reducers/eventItem';

import List from './generic/list';

const EventItemList = ({
  onAdd, onRemove, i18n, mobile, eventStore, eventItemStore,
  itemStore, eventId, growth, characterId,
}) => {
  const eventItems = growth
    ? calculateItems(eventItemStore, eventStore, characterId, eventId)
    : getEventItemsByEvent(eventItemStore, eventId);

  return (
    <Fragment>
      <List
        noSearch
        noView={growth}
        onAdd={!growth && onAdd}
        onRemove={!growth && onRemove}
        i18n={i18n}
        mobile={mobile}
        linkToPath={`${eventId}/eventItems`}
        columns={[
          { columnName: i18n.t('generic.name'), fieldName: 'itemId', format: formatItem(itemStore) },
          { columnName: i18n.t('generic.type'), fieldName: 'eventItemType', format: formatGenericValueTypes },
        ]}
        items={eventItems}
      />
    </Fragment>
  );
};

EventItemList.propTypes = {
  characterId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventItemStore: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  growth: PropTypes.bool.isRequired,
};

export default EventItemList;
