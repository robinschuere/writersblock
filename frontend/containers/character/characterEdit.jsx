import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addCharacter, updateCharacter } from '../../actions/character';
import { updateStorySettingList } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';
import StorySettingListSelect from '../../components/storySettingListSelect';
import Tabs from '../../components/generic/tabs';

const CharacterEdit = (props) => {
  const {
    computedMatch, characterStore, storySettingStore, dispatch, i18n, mobile,
  } = props;
  const { storyId, characterId } = computedMatch.params;
  const character = !characterId ? {} : characterStore[characterId];

  const [firstName, setFirstName] = useState(character.firstName);
  const [lastName, setLastName] = useState(character.lastName);
  const [authorDescription, setAuthorDescription] = useState(character.authorDescription);
  const [description, setDescription] = useState(character.description);
  const [race, setRace] = useState(character.race);
  const [gender, setGender] = useState(character.race);
  const [statisticTraits, setStatisticTraits] = useState(character.statisticTraits || []);
  const [personalTraits, setPersonalTraits] = useState(character.personalTraits || []);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [activeTab, setActiveTab] = useState(i18n.t('character.view.tabs.personal'));
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateCharacter = () => {
    if ([firstName, lastName].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const handleSetStatisticTrait = (id, level) => {
    const newArray = updateStorySettingList(statisticTraits, { id, level });
    setStatisticTraits(newArray);
  };

  const handleSetPersonalTrait = (id, level) => {
    const newArray = updateStorySettingList(personalTraits, { id, level });
    setPersonalTraits(newArray);
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateCharacter()) {
      const updatedCharacter = {
        ...character,
        firstName,
        lastName,
        authorDescription,
        race,
        gender,
        statisticTraits,
        personalTraits,
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
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        {showAlert && <Alert message={i18n.t('character.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('character.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.firstname')} placeholder={i18n.t('character.placeholders.firstname')} onChange={setFirstName} value={firstName} />
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('character.lastname')} placeholder={i18n.t('character.placeholders.lastname')} onChange={setLastName} value={lastName} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <StorySettingSelect validatedOnce={validatedOnce} storyId={storyId} parent="character" type="race" i18n={i18n} storySettingStore={storySettingStore} onChange={setRace} value={race} />
          <StorySettingSelect validatedOnce={validatedOnce} storyId={storyId} parent="character" type="gender" i18n={i18n} storySettingStore={storySettingStore} onChange={setGender} value={gender} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('character.view.tabs.personal'), render: () => <StorySettingListSelect {...props} storyId={storyId} parent="character" type="trait" subType="personal" onChange={handleSetPersonalTrait} values={personalTraits} /> },
            { tabName: i18n.t('character.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} parent="character" type="trait" subType="statistic" onChange={handleSetStatisticTrait} values={statisticTraits} /> },
          ]}
        />
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
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(CharacterEdit);
