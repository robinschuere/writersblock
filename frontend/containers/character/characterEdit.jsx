import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addCharacter, updateCharacter } from '../../actions/character';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';
import { useField } from '../../helpers';

const CharacterEdit = (props) => {
  const {
    computedMatch, withAuthorDescription, characterStore, dispatch, i18n, mobile,
  } = props;
  const { storyId, characterId } = computedMatch.params;

  const character = !characterId ? {} : characterStore[characterId];

  const [updatedCharacter, setCharacterFieldProps] = useField(character);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateCharacter = () => {
    if ([updatedCharacter.firstName, updatedCharacter.lastName].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateCharacter()) {
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
    return <Redirect to={`/stories/${storyId}/characters`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('character.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('character.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.firstname')} placeholder={i18n.t('character.placeholders.firstname')} {...setCharacterFieldProps('firstName')} />
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.lastname')} placeholder={i18n.t('character.placeholders.lastname')} {...setCharacterFieldProps('lastName')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setCharacterFieldProps('authorDescription')} />
          )}
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="race" {...setCharacterFieldProps('race')} />
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="gender" {...setCharacterFieldProps('gender')} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setCharacterFieldProps('description')} />
        </form>
      </div>
    </Fragment>
  );
};

CharacterEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  characterStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(CharacterEdit);
