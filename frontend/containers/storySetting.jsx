import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getStorySettingOptions, getStorySettingSubTypeOptions } from '../helpers';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';

const StorySetting = ({
  computedMatch, storySettingStore, history, i18n,
}) => {
  const { storyId, storySettingId } = computedMatch.params;
  const storySetting = storySettingStore[storySettingId];

  const handleUpdate = () => {
    history.push(`/stories/${storyId}/storySettings/${storySettingId}/edit`);
  };

  const subTypes = getStorySettingSubTypeOptions(storySetting.type, i18n);

  return (
    <div>
      <div className="container">
        <h3>{i18n.t('storySetting.view.header', { title: storySetting.name })}</h3>
        <p>{i18n.t('storySetting.view.message')}</p>
        <Button color="green" toRight onClick={handleUpdate}>{i18n.t('generic.edit')}</Button>
        <form className="form-horizontal">
          <h5>{i18n.t('storySetting.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={storySetting.name} />
          <LabelAndText type="select" options={getStorySettingOptions(i18n)} label={i18n.t('generic.type')} value={storySetting.type} />
          {subTypes && <LabelAndText type="select" options={subTypes} label={i18n.t('generic.subType')} value={storySetting.subType} />}
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={storySetting.authorDescription} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={storySetting.description} />
        </form>
      </div>
    </div>
  );
};

StorySetting.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(StorySetting));
