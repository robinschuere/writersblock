import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import LabelAndField from './generic/labelAndField';
import Alert from './generic/alert';

const StorySettingSelect = ({
  storySettingStore, storyId, value, onChange, type, validatedOnce, i18n,
}) => {
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n,
  );
  const selectedOption = options.find(v => v.value === value);
  if (options.length > 0) {
    return (
      <Fragment>
        <LabelAndField validatedOnce={validatedOnce} type="select" label={i18n.t(`storySetting.types.${type}.type`)} options={options} onChange={onChange} value={value} />
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

StorySettingSelect.propTypes = {
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  validatedOnce: PropTypes.bool.isRequired,
};

export default StorySettingSelect;
