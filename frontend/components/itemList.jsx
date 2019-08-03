import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate } from '../helpers';

import List from './generic/list';

const ItemList = ({
  computedMatch, mobile, itemStore, history, i18n,
}) => {
  const { storyId } = computedMatch.params;
  const items = Object.keys(itemStore)
    .map(key => ({
      ...itemStore[key],
    }))
    .filter(c => c.storyId === storyId);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/items/new`);
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${storyId}/items/${item.id}/delete`);
  };

  return (
    <List
      i18n={i18n}
      onAdd={handleAdd}
      onRemove={handleStartRemove}
      mobile={mobile}
      linkToPath="items"
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'name' },
        { columnName: i18n.t('generic.authorDescription'), fieldName: 'authorDescription' },
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
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(ItemList);
