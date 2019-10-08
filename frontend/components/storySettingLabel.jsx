import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import LabelAndText from './generic/labelAndText';
import Alert from './generic/alert';

const StorySettingLabel = ({
  storyStore, storySettingStore, storyId, value, type, subType, i18n, mobile, label,
}) => {
  const withAuthorDescription = storyStore[storyId].withAuthorDescription || false;
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n, subType, withAuthorDescription,
  );
  const selectedOption = options.find(v => v.value === value);
  if (options.length > 0) {
    return (
      <Fragment>
        <LabelAndText type="select" label={label || i18n.t(`storySetting.types.${type}.type`)} value={value} options={options} />
        {(!mobile && selectedOption && selectedOption.authorDescription) && (
          <Fragment>
            <Alert level="info" message={selectedOption.authorDescription} />
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
  storyStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subType: PropTypes.string,
  value: PropTypes.string,
  mobile: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

StorySettingLabel.defaultProps = {
  value: undefined,
  label: '',
  subType: '',
};

export default StorySettingLabel;
