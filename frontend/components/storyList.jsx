import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate, formatAmount } from '../helpers';

import List from './generic/list';

const StoryList = ({
  mobile, storyStore, history,
}) => {
  const stories = Object.keys(storyStore).map(key => ({
    ...storyStore[key],
  }));

  const handleAdd = () => {
    history.push('/stories/new');
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${item.id}/delete`);
  };

  return (
    <List
      onAdd={handleAdd}
      onRemove={handleStartRemove}
      mobile={mobile}
      linkToPath="stories"
      columns={[
        { columnName: 'Name', fieldName: 'name' },
        { columnName: 'Chapters', fieldName: 'chapters', format: formatAmount },
        { columnName: 'Created At', fieldName: 'createdAt', format: formatDate },
        { columnName: 'Updated At', fieldName: 'updatedAt', format: formatDate },
      ]}
      items={stories}
    />
  );
};

StoryList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  storyStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(StoryList);
