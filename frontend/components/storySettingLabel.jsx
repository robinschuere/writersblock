import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import LabelAndText from './generic/labelAndText';
import Alert from './generic/alert';

const StorySettingLabel = ({
  storySettingStore, storyId, value, type, i18n,
}) => {
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n,
  );
  const selectedOption = options.find(v => v.value === value);
  if (options.length > 0) {
    return (
      <Fragment>
        <LabelAndText type="select" label={i18n.t(`storySetting.types.${type}.type`)} value={value} options={options} />
        {selectedOption && (
          <Fragment>
            <Alert level="info" message={selectedOption.description} />
            <br />
          </Fragment>
        )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Alert level="warn" message={i18n.t(`storySetting.types.${type}.missing`)} />
      <br />
    </Fragment>
  );
};

StorySettingLabel.propTypes = {
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

StorySettingLabel.defaultProps = {
  value: undefined,
};

export default StorySettingLabel;
