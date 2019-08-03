import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';
import StorySettingLabel from '../components/storySettingLabel';
import StorySettingListSelect from '../components/storySettingListSelect';

const Character = ({
  computedMatch, characterStore, storySettingStore, history, i18n,
}) => {
  const { storyId, characterId } = computedMatch.params;
  const character = characterStore[characterId];

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/characters/${characterId}/edit`);
  };

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
          <StorySettingLabel storyId={storyId} parent="character" type="race" i18n={i18n} storySettingStore={storySettingStore} value={character.race} />
          <StorySettingLabel storyId={storyId} parent="character" type="gender" i18n={i18n} storySettingStore={storySettingStore} value={character.gender} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={character.description} />
          <StorySettingListSelect readOnly storyId={storyId} parent="character" type="trait" subType="statistic" i18n={i18n} storySettingStore={storySettingStore} values={character.statisticTraits} />
          <StorySettingListSelect readOnly storyId={storyId} parent="character" type="trait" subType="personal" i18n={i18n} storySettingStore={storySettingStore} values={character.personalTraits} />
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
