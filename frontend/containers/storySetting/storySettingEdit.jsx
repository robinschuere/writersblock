import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addStorySetting, updateStorySetting } from '../../actions/storySetting';
import { getStorySettingOptions, getStorySettingSubTypeOptions, useField } from '../../helpers';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';

const StorySettingEdit = ({
  computedMatch, withAuthorDescription, storySettingStore, dispatch, i18n, mobile,
}) => {
  const { storyId, storySettingId } = computedMatch.params;
  const storySetting = !storySettingId ? {} : storySettingStore[storySettingId];

  const [updatedStorySetting, setStorySettingProps] = useField(storySetting);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const subTypes = updatedStorySetting.type
    ? getStorySettingSubTypeOptions(updatedStorySetting.type, i18n)
    : undefined;

  const validate = () => {
    if ([updatedStorySetting.name, updatedStorySetting.type].filter(x => x).length !== 2) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
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
    return <Redirect to={`/stories/${storyId}/storySettings`} />;
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
        {showAlert && <Alert message={i18n.t('storySetting.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('storySetting.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setStorySettingProps('name')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getStorySettingOptions(i18n)} label={i18n.t('generic.type')} {...setStorySettingProps('type')} />
          {(!mobile && updatedStorySetting.type) && <Alert level="info" message={i18n.t(`storySetting.types.${updatedStorySetting.type}.description`)} />}
          {subTypes && <LabelAndField type="select" options={subTypes} label={i18n.t('generic.subType')} {...setStorySettingProps('subType')} />}
          {(!mobile && updatedStorySetting.subType) && <Alert level="info" message={i18n.t(`storySetting.types.${updatedStorySetting.type}.subTypes.${updatedStorySetting.subType}.description`)} />}
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setStorySettingProps('authorDescription')} />
          )}
          <LabelAndField validatedOnce={validatedOnce} type="textarea" amountOfRows={mobile || withAuthorDescription ? 10 : 20} label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setStorySettingProps('description')} />
        </form>
      </div>
    </Fragment>
  );
};

StorySettingEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(StorySettingEdit);
