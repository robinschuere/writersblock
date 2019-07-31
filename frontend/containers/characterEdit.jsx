/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import constants from '../constants';
import { getOptionsFromStorySetting } from '../helpers';
import { addCharacter, updateCharacter } from '../actions/character';


import Alert from '../components/generic/alert';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';
import Label from '../components/generic/label';

const CharacterEdit = ({
  computedMatch, characterStore, storySettingStore, dispatch, i18n,
}) => {
  const { storyId, characterId } = computedMatch.params;
  const character = !characterId ? {} : characterStore[characterId];

  const [firstName, setFirstName] = useState(character.firstName);
  const [lastName, setLastName] = useState(character.lastName);
  const [authorDescription, setAuthorDescription] = useState(character.authorDescription);
  const [description, setDescription] = useState(character.description);
  const [race, setRace] = useState(character.race);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateCharacter = () => {
    if ([firstName, lastName, authorDescription].filter(x => x).length !== 3) {
      return false;
    }
    return true;
  };

  const raceOptions = getOptionsFromStorySetting(
    storySettingStore, storyId, constants.storySetting.types.race.value,
  );

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateCharacter()) {
      const updatedCharacter = {
        ...character,
        firstName,
        lastName,
        authorDescription,
        race,
        description,
      };
      if (updatedCharacter.id) {
        await updateCharacter(updatedCharacter, dispatch);
      } else {
        await addCharacter({ ...updatedCharacter, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={characterId ? `/stories/${storyId}/characters/${characterId}` : `/stories/${storyId}/characters`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={addOrUpdate} onClose={() => setCompleted(true)} i18n={i18n} />
      <div className="container">
        {showAlert && <Alert message={i18n.t('character.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('character.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.firstname')} placeholder={i18n.t('character.placeholders.firstname')} onChange={setFirstName} value={firstName} />
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.lastname')} placeholder={i18n.t('character.placeholders.lastname')} onChange={setLastName} value={lastName} />
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          { raceOptions.length > 0
            ? <LabelAndField validatedOnce={validatedOnce} required type="select" label={i18n.t('character.race')} options={raceOptions} onChange={setRace} value={race} />
            : <Label level="warning" fieldLabel={i18n.t('character.edit.noStorySettingRaces')} id="1" />
          }
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

CharacterEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(CharacterEdit);
