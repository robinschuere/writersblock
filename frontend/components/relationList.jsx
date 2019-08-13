import React from 'react';
import PropTypes from 'prop-types';

import { formatCharacter } from '../helpers';

import List from './generic/list';

const RelationList = ({
  i18n, relations, history, computedMatch, mobile, characterStore,
}) => {
  const { storyId, characterId } = computedMatch.params;

  const relationsToShow = relations.map(r => ({
    id: r.id,
    relatedTo: r.parentId === characterId ? r.childId : r.parentId,
    relation: r.parentId === characterId ? r.relation : r.reverseRelation,
  }));

  const handleAdd = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/relations/new`);
  };

  const handleRemove = (item) => {
    history.push(`/stories/${storyId}/characters/${characterId}/relations/${item.id}/delete`);
  };

  return (
    <List
      i18n={i18n}
      onAdd={handleAdd}
      onRemove={handleRemove}
      mobile={mobile}
      linkToPath={`${characterId}/relations`}
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'relatedTo', format: formatCharacter(characterStore) },
        { columnName: i18n.t('generic.relation'), fieldName: 'relation' },
      ]}
      items={relationsToShow}
    />
  );
};

RelationList.propTypes = {
  i18n: PropTypes.object.isRequired,
  relations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    storyId: PropTypes.string,
    parentId: PropTypes.string,
    childId: PropTypes.string,
    relation: PropTypes.string,
    reverseRelation: PropTypes.string,
  })).isRequired,
  computedMatch: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
  characterStore: PropTypes.object.isRequired,
};

export default RelationList;
