/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import Label from './generic/label';
import LabelAndText from './generic/labelAndText';

const StorySettingLabel = ({
  storySettingStore, storyId, value, type, i18n, parent,
}) => {
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n,
  );
  const selectedOption = options.find(v => v.value === value);
  if (options.length > 0) {
    return (
      <Fragment>
        <LabelAndText type="select" label={i18n.t(`${parent}.${type}`)} value={value} options={options} />
        {selectedOption && (
          <Fragment>
            <Label level="info" fieldLabel={selectedOption.description} />
            <br />
          </Fragment>
        )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Label level="warning" fieldLabel={i18n.t(`${parent}.edit.${type}`)} />
      <br />
    </Fragment>
  );
};

StorySettingLabel.propTypes = {
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default StorySettingLabel;
