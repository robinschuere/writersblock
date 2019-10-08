import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatPower, formatGenericValueTypes, calculatePowers } from '../helpers';
import { getEventPowersByEvent } from '../reducers/eventPower';

import List from './generic/list';

const EventPowerList = ({
  onAdd, onRemove, i18n, mobile, eventPowerStore,
  powerStore, eventId, characterId, eventStore, growth,
}) => {
  const eventPowers = growth
    ? calculatePowers(eventPowerStore, eventStore, characterId, eventId)
    : getEventPowersByEvent(eventPowerStore, eventId);

  return (
    <Fragment>
      <List
        noSearch
        noView={growth}
        onAdd={!growth && onAdd}
        onRemove={!growth && onRemove}
        i18n={i18n}
        mobile={mobile}
        linkToPath={`${eventId}/eventPowers`}
        columns={[
          { columnName: i18n.t('generic.name'), fieldName: 'powerId', format: formatPower(powerStore) },
          { columnName: i18n.t('generic.type'), fieldName: 'eventPowerType', format: formatGenericValueTypes },
        ]}
        items={eventPowers}
      />
    </Fragment>
  );
};

EventPowerList.propTypes = {
  characterId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventPowerStore: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  growth: PropTypes.bool.isRequired,
};

export default EventPowerList;
