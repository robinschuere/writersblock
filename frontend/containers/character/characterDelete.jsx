import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeCharacter } from '../../actions/character';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const CharacterDelete = ({
  computedMatch, characterStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, characterId } = computedMatch.params;
  const character = characterStore[characterId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeCharacter(character, dispatch);
  };

  if (completed || !character) {
    return <Redirect to={`/stories/${storyId}/characters`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('character.delete.header', { title: `${character.firstName} ${character.lastName}` })}</h4>
        <p>{i18n.t('character.delete.message')}</p>
      </div>
    </Fragment>
  );
};

CharacterDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  characterStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(CharacterDelete);
