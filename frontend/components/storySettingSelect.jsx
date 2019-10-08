import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import LabelAndField from './generic/labelAndField';
import Alert from './generic/alert';

const StorySettingSelect = ({
  storySettingStore, storyId, value, onChange, type, subType,
  validatedOnce, i18n, mobile, withoutExistingValues, label,
}) => {
  const options = withoutExistingValues.length === 0
    ? getOptionsFromStorySetting(storySettingStore, storyId, type, i18n, subType)
    : getOptionsFromStorySetting(storySettingStore, storyId, type, i18n, subType)
      .filter(c => c.id === value || !withoutExistingValues.includes(c.id));

  const selectedOption = options.find(v => v.value === value);
  if (options.length > 0) {
    return (
      <Fragment>
        <LabelAndField
          validatedOnce={validatedOnce}
          type="select"
          label={label || i18n.t(`storySetting.types.${type}.type`)}
          placeholder={i18n.t(`storySetting.types.${type}.placeholder`)}
          options={options}
          onChange={onChange}
          value={value}
        />
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

StorySettingSelect.propTypes = {
  mobile: PropTypes.bool.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  validatedOnce: PropTypes.bool.isRequired,
  withoutExistingValues: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

StorySettingSelect.defaultProps = {
  withoutExistingValues: [],
  label: '',
};

export default StorySettingSelect;
