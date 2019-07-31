import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeCharacter } from '../actions/character';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const Character = ({
  computedMatch, characterStore, dispatch, i18n,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, characterId } = computedMatch.params;
  const character = characterStore[characterId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeCharacter(character, dispatch);
    handleClose();
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/characters`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('character.delete.header', { title: `${character.firstName} ${character.lastName}` })}</h4>
        <p>{i18n.t('character.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Character.propTypes = {
  dispatch: PropTypes.func.isRequired,
  characterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Character);
