import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate } from '../helpers';

import List from './generic/list';

const PowerList = (props) => {
  const {
    computedMatch, powerStore, history, i18n,
  } = props;
  const { storyId } = computedMatch.params;
  const powers = Object.keys(powerStore)
    .map(key => ({
      ...powerStore[key],
    }))
    .filter(c => c.storyId === storyId);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/powers/new`);
  };

  const handleRemove = (item) => {
    history.push(`/stories/${storyId}/powers/${item.id}/delete`);
  };

  return (
    <List
      {...props}
      onAdd={handleAdd}
      onRemove={handleRemove}
      linkToPath="powers"
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'name' },
        { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
        { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
      ]}
      items={powers}
    />
  );
};

PowerList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(PowerList);
