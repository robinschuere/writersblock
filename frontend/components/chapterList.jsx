import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate, formatAmount, counterSort } from '../helpers';

import List from './generic/list';

const ChapterList = (props) => {
  const {
    computedMatch, chapterStore, history, i18n,
  } = props;
  const { storyId } = computedMatch.params;
  const chapters = Object.keys(chapterStore)
    .filter(key => chapterStore[key].storyId === storyId)
    .map(key => ({
      ...chapterStore[key],
    }))
    .sort(counterSort);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/chapters/new`);
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${storyId}/chapters/${item.id}/delete`);
  };

  return (
    <List
      {...props}
      onAdd={handleAdd}
      onRemove={handleStartRemove}
      linkToPath="chapters"
      columns={[
        { columnName: i18n.t('generic.counter'), fieldName: 'counter' },
        { columnName: i18n.t('generic.title'), fieldName: 'title' },
        { columnName: i18n.t('chapter.list.columns.words'), fieldName: 'text', format: formatAmount },
        { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
        { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
      ]}
      items={chapters}
    />
  );
};

ChapterList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  chapterStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(ChapterList);
