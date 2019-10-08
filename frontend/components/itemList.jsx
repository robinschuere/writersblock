import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  alphabeticalSort, formatDate, formatYesNo, formatSlotId, formatStorySetting, formatTraitLevels,
} from '../helpers';

import List from './generic/list';

const ItemList = (props) => {
  const {
    computedMatch, itemStore, history, i18n, storySettingStore,
  } = props;
  const { storyId } = computedMatch.params;
  const items = Object.keys(itemStore)
    .map(key => ({
      ...itemStore[key],
    }))
    .filter(c => c.storyId === storyId)
    .sort(alphabeticalSort);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/items/new`);
  };

  const handleRemove = (item) => {
    history.push(`/stories/${storyId}/items/${item.id}/delete`);
  };

  return (
    <List
      {...props}
      onAdd={handleAdd}
      onRemove={handleRemove}
      linkToPath="items"
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'name' },
        { columnName: i18n.t('generic.type'), fieldName: 'type', format: formatStorySetting(storySettingStore) },
        { columnName: i18n.t('slot.name'), fieldName: 'slotId', format: formatSlotId },
        { columnName: i18n.t('generic.title'), fieldName: 'titleId', format: formatStorySetting(storySettingStore) },
        { columnName: i18n.t('generic.unique'), fieldName: 'unique', format: formatYesNo },
        { columnName: i18n.t('generic.level'), fieldName: 'statisticTraits', format: formatTraitLevels },
        { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
        { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
      ]}
      items={items}
    />
  );
};

ItemList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(ItemList);
