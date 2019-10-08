import React from 'react';
import PropTypes from 'prop-types';

import StorySettingList from '../../components/storySettingList';
import WithNavBar from '../../components/hoc/withNavBar';

const StorySettings = (props) => {
  const { i18n } = props;
  return (
    <div className="container-fluid">
      <h4>{i18n.t('storySetting.list.header')}</h4>
      <StorySettingList {...props} />
    </div>
  );
};

StorySettings.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(StorySettings);
