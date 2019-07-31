import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate, formatAmount } from '../helpers';

import List from './generic/list';

const ChapterList = ({
  computedMatch, mobile, chapterStore, history, i18n,
}) => {
  const { storyId } = computedMatch.params;
  const chapters = Object.keys(chapterStore)
    .map(key => ({
      ...chapterStore[key],
    }))
    .filter(c => c.storyId === storyId)
    .sort((a, b) => a.counter - b.counter);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/chapters/new`);
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${storyId}/chapters/${item.id}/delete`);
  };

  return (
    <List
      i18n={i18n}
      onAdd={handleAdd}
      onRemove={handleStartRemove}
      mobile={mobile}
      linkToPath="chapters"
      columns={[
        { columnName: i18n.t('generic.counter'), fieldName: 'counter' },
        { columnName: i18n.t('generic.title'), fieldName: 'title' },
        { columnName: i18n.t('generic.authorDescription'), fieldName: 'authorDescription' },
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
