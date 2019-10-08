import React from 'react';
import PropTypes from 'prop-types';

import { formatCharacter, formatStorySetting, calculateRelations } from '../helpers';
import List from './generic/list';
import { getEventRelationsByEvent } from '../reducers/eventRelation';

const EventRelationList = ({
  onAdd, onRemove, i18n, mobile, eventId, characterStore,
  eventRelationStore, characterId, eventStore, growth, storySettingStore,
}) => {
  const eventRelations = growth
    ? calculateRelations(eventRelationStore, eventStore, characterId, eventId)
    : getEventRelationsByEvent(eventRelationStore, eventId);

  return (
    <List
      noSearch
      noView={growth}
      onAdd={!growth && onAdd}
      onRemove={!growth && onRemove}
      i18n={i18n}
      mobile={mobile}
      linkToPath={`${eventId}/eventRelations`}

      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'characterId', format: formatCharacter(characterStore) },
        { columnName: i18n.t('generic.type'), fieldName: 'relationType', format: formatStorySetting(storySettingStore) },
        { columnName: i18n.t('generic.level'), fieldName: 'level' },
      ]}
      items={eventRelations}
    />
  );
};

EventRelationList.propTypes = {
  characterId: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  eventStore: PropTypes.object.isRequired,
  eventRelationStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  growth: PropTypes.bool.isRequired,
};

export default EventRelationList;
