/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import NumberInput from './generic/numberInput';
import Label from './generic/label';
import List from './generic/list';

const StorySettingListSelect = ({
  storySettingStore, storyId, values, type, i18n, onChange, parent, subType, readOnly, mobile,
}) => {
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n, subType,
  )
    .map((option) => {
      const existingValue = values.find(v => v.id === option.value);
      return {
        ...option,
        level: existingValue ? existingValue.level : 0,
      };
    });

  if (options.length === 0) {
    return (<Label level="warning" fieldLabel={i18n.t(`${parent}.edit.${type}`)} />);
  }

  const renderField = option => (
    <Fragment>
      {readOnly && <Label level="warning" fieldLabel={option.level} />}
      {!readOnly && (
        <NumberInput onChange={e => onChange(option.value, e)} value={option.level} />
      )}
    </Fragment>
  );

  return (
    <List
      noView
      i18n={i18n}
      mobile={mobile}
      columns={[
        { columnName: i18n.t('generic.name'), fieldName: 'label' },
        { columnName: i18n.t('generic.level'), fieldName: 'level', renderField },
        { columnName: i18n.t('generic.description'), fieldName: 'description' },
      ]}
      items={options}
    />
  );
};

StorySettingListSelect.propTypes = {
  storySettingStore: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number,
  })),
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subType: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  mobile: PropTypes.bool.isRequired,
};

StorySettingListSelect.defaultProps = {
  subType: undefined,
  readOnly: false,
  onChange: undefined,
  values: [],
};

export default StorySettingListSelect;
