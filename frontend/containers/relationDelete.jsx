import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeRelation } from '../actions/relation';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';
import { formatCharacter } from '../helpers';

const RelationDelete = ({
  computedMatch, relationStore, dispatch, i18n, characterStore,
}) => {
  const {
    storyId, relationId, characterId,
  } = computedMatch.params;
  const relation = relationStore[relationId];

  const [completed, setCompleted] = useState(false);

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeRelation(relation, dispatch);
    handleClose();
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/characters/${characterId}`} />;
  }

  const childId = relation.parentId === characterId ? relation.childId : relation.parentId;
  const personA = formatCharacter(characterStore)(characterId);
  const personB = formatCharacter(characterStore)(childId);

  return (
    <Fragment>
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('relation.delete.header', { personA, personB })}</h4>
        <p>{i18n.t('relation.delete.message')}</p>
      </div>
    </Fragment>
  );
};

RelationDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  relationStore: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(RelationDelete);
