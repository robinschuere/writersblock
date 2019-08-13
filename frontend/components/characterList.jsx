import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { formatDate } from '../helpers';

import List from './generic/list';

const CharacterList = ({
  computedMatch, mobile, characterStore, history, i18n,
}) => {
  const { storyId } = computedMatch.params;
  const characters = Object.keys(characterStore)
    .filter(key => characterStore[key].storyId === storyId)
    .map(key => ({
      ...characterStore[key],
    }));

  const handleAdd = () => {
    history.push(`/stories/${storyId}/characters/new`);
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${storyId}/characters/${item.id}/delete`);
  };

  return (
    <List
      i18n={i18n}
      onAdd={handleAdd}
      onRemove={handleStartRemove}
      mobile={mobile}
      linkToPath="characters"
      columns={[
        { columnName: i18n.t('character.firstname'), fieldName: 'firstName' },
        { columnName: i18n.t('character.lastname'), fieldName: 'lastName' },
        { columnName: i18n.t('generic.authorDescription'), fieldName: 'authorDescription' },
        { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
        { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
      ]}
      items={characters}
    />
  );
};

CharacterList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(CharacterList);
