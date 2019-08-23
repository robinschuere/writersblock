import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getChaptersByStory } from '../../reducers/chapter';
import { getCharactersByStory } from '../../reducers/character';
import { getItemsByStory } from '../../reducers/item';
import { getPlacesByStory } from '../../reducers/place';
import { getStorySettingsByStory } from '../../reducers/storySetting';
import { formatDate } from '../../helpers';

import List from '../../components/generic/list';
import WithNavBar from '../../components/hoc/withNavBar';

const Stories = ({
  mobile, history, i18n, exportToJSON,
  storyStore, chapterStore, characterStore, itemStore, placeStore, storySettingStore,
}) => {
  const stories = Object.keys(storyStore).map(key => ({
    ...storyStore[key],
    chapters: getChaptersByStory(chapterStore, key).length,
    characters: getCharactersByStory(characterStore, key).length,
    items: getItemsByStory(itemStore, key).length,
    places: getPlacesByStory(placeStore, key).length,
    storySettings: getStorySettingsByStory(storySettingStore, key).length,
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
          { columnName: i18n.t('story.list.columns.chapters'), fieldName: 'chapters' },
          { columnName: i18n.t('story.list.columns.characters'), fieldName: 'characters' },
          { columnName: i18n.t('story.list.columns.items'), fieldName: 'items' },
          { columnName: i18n.t('story.list.columns.places'), fieldName: 'places' },
          { columnName: i18n.t('story.list.columns.storySettings'), fieldName: 'storySettings' },
          { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
          { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
        ]}
        items={stories}
        customActions={[
          {
            icon: 'file-export',
            color: 'orange',
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
  characterStore: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  placeStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  exportToJSON: PropTypes.func.isRequired,
};

export default WithNavBar(withRouter(Stories));
