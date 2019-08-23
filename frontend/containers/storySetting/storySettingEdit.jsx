import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addStorySetting, updateStorySetting } from '../../actions/storySetting';
import { getStorySettingOptions, getStorySettingSubTypeOptions } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import Label from '../../components/generic/label';

const StorySettingEdit = ({
  computedMatch, storySettingStore, dispatch, i18n, mobile,
}) => {
  const { storyId, storySettingId } = computedMatch.params;
  const storySetting = !storySettingId ? {} : storySettingStore[storySettingId];

  const [name, setName] = useState(storySetting.name);
  const [type, setType] = useState(storySetting.type);
  const [subType, setSubType] = useState(storySetting.subType);
  const [description, setDescription] = useState(storySetting.description);
  const [authorDescription, setAuthorDescription] = useState(storySetting.authorDescription);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const subTypes = type ? getStorySettingSubTypeOptions(type, i18n) : undefined;

  const validate = () => {
    if ([name, type].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      const updatedStorySetting = {
        ...storySetting,
        name,
        type,
        subType,
        authorDescription,
        description,
      };
      if (updatedStorySetting.id) {
        await updateStorySetting(updatedStorySetting, dispatch);
      } else {
        await addStorySetting({ ...updatedStorySetting, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={storySettingId ? `/stories/${storyId}/storySettings/${storySettingId}` : `/stories/${storyId}/storySettings`} />;
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
        {showAlert && <Alert message={i18n.t('storySetting.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('storySetting.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getStorySettingOptions(i18n)} label={i18n.t('generic.type')} onChange={setType} value={type} />
          {type && <Label level="info" fieldLabel={i18n.t(`storySetting.types.${type}.description`)} />}
          {subTypes && <LabelAndField type="select" options={subTypes} label={i18n.t('generic.subType')} onChange={setSubType} value={subType} />}
          {subType && <Label level="info" fieldLabel={i18n.t(`storySetting.types.${type}.subTypes.${subType}.description`)} />}
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

StorySettingEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(StorySettingEdit);
