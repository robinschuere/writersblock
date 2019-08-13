import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getChaptersByStory } from '../reducers/chapter';
import { formatDate, formatAmount } from '../helpers';

import List from '../components/generic/list';
import WithNavBar from '../components/hoc/withNavBar';

const Stories = ({
  mobile, userStore, storyStore, chapterStore, history, i18n, exportToJSON,
}) => {
  const stories = Object.keys(storyStore).map(key => ({
    ...storyStore[key],
    user: userStore[storyStore[key].userId],
    chapters: getChaptersByStory(chapterStore, key),
  }));

  const handleAdd = () => {
    history.push('/stories/new');
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${item.id}/delete`);
  };

  return (
    <div className="container">
      <h4>{i18n.t('story.list.header')}</h4>
      <p>{i18n.t('story.list.message')}</p>
      <List
        i18n={i18n}
        onAdd={handleAdd}
        onRemove={handleStartRemove}
        mobile={mobile}
        linkToPath="stories"
        columns={[
          { columnName: i18n.t('generic.title'), fieldName: 'title' },
          { columnName: i18n.t('story.list.columns.chapters'), fieldName: 'chapters', format: formatAmount },
          { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
          { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
        ]}
        items={stories}
        customActions={[
          {
            color: 'yellow',
            action: exportToJSON,
            text: i18n.t('generic.export.wbson'),
          },
        ]}
      />
    </div>
  );
};

Stories.propTypes = {
  mobile: PropTypes.bool.isRequired,
  storyStore: PropTypes.object.isRequired,
  chapterStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  exportToJSON: PropTypes.func.isRequired,
};

export default WithNavBar(withRouter(Stories));
