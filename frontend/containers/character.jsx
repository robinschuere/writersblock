import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import constants from '../constants';
import { getOptionsFromStorySetting } from '../helpers';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';

const Character = ({
  computedMatch, characterStore, storySettingStore, history, i18n,
}) => {
  const { storyId, characterId } = computedMatch.params;
  const character = characterStore[characterId];

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/edit`);
  };

  const raceOptions = getOptionsFromStorySetting(
    storySettingStore, storyId, constants.storySetting.types.race,
  );

  return (
    <div>
      <div className="container">
        <h3>{i18n.t('character.view.header', { title: `${character.firstName} ${character.lastName}` })}</h3>
        <p>{i18n.t('character.view.message')}</p>
        <Button color="green" toRight onClick={handleChangeCharacter}>{i18n.t('generic.edit')}</Button>
        <form className="form-horizontal">
          <h5>Character information</h5>
          <LabelAndText type="text" label={i18n.t('character.firstname')} value={character.firstName} />
          <LabelAndText type="text" label={i18n.t('character.lastname')} value={character.lastName} />
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={character.authorDescription} />
          <LabelAndText type="select" label={i18n.t('character.race')} value={character.race} options={raceOptions} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={character.description} />
        </form>
      </div>
    </div>
  );
};

Character.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(Character));
