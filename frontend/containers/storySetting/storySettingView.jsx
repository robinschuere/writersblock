import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { getStorySettingOptions, getStorySettingSubTypeOptions } from '../../helpers';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndEditBar from '../../components/backAndEditBar';

const StorySetting = ({
  computedMatch, storySettingStore, history, i18n, mobile,
}) => {
  const { storyId, storySettingId } = computedMatch.params;
  const storySetting = storySettingStore[storySettingId];
  const [completed, setCompleted] = useState(false);

  const handleUpdate = () => {
    history.push(`/stories/${storyId}/storySettings/${storySettingId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/storySettings`} />;
  }

  const subTypes = getStorySettingSubTypeOptions(storySetting.type, i18n);

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        <form className="form-horizontal">
          <h5>{i18n.t('storySetting.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={storySetting.name} />
          <LabelAndText type="select" options={getStorySettingOptions(i18n)} label={i18n.t('generic.type')} value={storySetting.type} />
          {subTypes && <LabelAndText type="select" options={subTypes} label={i18n.t('generic.subType')} value={storySetting.subType} />}
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={storySetting.authorDescription} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={storySetting.description} />
        </form>
      </div>
    </Fragment>
  );
};

StorySetting.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(StorySetting));
