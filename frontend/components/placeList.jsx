import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate } from '../helpers';

import List from './generic/list';

const PlaceList = (props) => {
  const {
    computedMatch, placeStore, history, i18n,
  } = props;
  const { storyId } = computedMatch.params;
  const places = Object.keys(placeStore)
    .map(key => ({
      ...placeStore[key],
    }))
    .filter(c => c.storyId === storyId);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/places/new`);
  };

  const handleRemove = (item) => {
    history.push(`/stories/${storyId}/places/${item.id}/delete`);
  };

  return (
    <List
      {...props}
      onAdd={handleAdd}
      onRemove={handleRemove}
      linkToPath="places"
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'name' },
        { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
        { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
      ]}
      items={places}
    />
  );
};

PlaceList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  placeStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(PlaceList);
