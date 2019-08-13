import React from 'react';
import PropTypes from 'prop-types';

import { formatChapter, formatCharacter } from '../helpers';

import List from './generic/list';
import constants from '../constants';

const EventList = ({
  i18n, events, history, computedMatch, mobile, chapterStore, characterStore, storyRoute, parentId,
}) => {
  const { storyId } = computedMatch.params;

  const getParent = () => {
    switch (storyRoute) {
      case constants.storyRoutes.chapters:
        return {
          columnName: i18n.t('generic.character'),
          fieldName: 'characterId',
          format: formatCharacter(characterStore),
        };
      case constants.storyRoutes.characters:
        return {
          columnName: i18n.t('generic.chapter'),
          fieldName: 'chapterId',
          format: formatChapter(chapterStore),
        };
      default:
        throw new Error('type is not defined yet');
    }
  };

  const parent = getParent();

  const handleAdd = () => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/new`);
  };

  const handleRemove = (item) => {
    history.push(`/stories/${storyId}/${storyRoute}/${parentId}/events/${item.id}/delete`);
  };

  return (
    <List
      i18n={i18n}
      onAdd={handleAdd}
      onRemove={handleRemove}
      mobile={mobile}
      linkToPath={`${parentId}/events`}
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'name' },
        parent,
        { columnName: i18n.t('generic.description'), fieldName: 'description' },
      ]}
      items={events}
    />
  );
};

EventList.propTypes = {
  i18n: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    storyId: PropTypes.string,
    chapterId: PropTypes.string,
    characterId: PropTypes.string,
    notes: PropTypes.string,
    statisticalTraits: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
  computedMatch: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  chapterStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storyRoute: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
};

export default EventList;
