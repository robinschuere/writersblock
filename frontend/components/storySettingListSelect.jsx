/* eslint-disable jsx-a11y/label-has-for */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getOptionsFromStorySetting } from '../helpers';
import NumberInput from './generic/numberInput';
import Label from './generic/label';

const StorySettingListSelect = ({
  storySettingStore, storyId, values, type, i18n, onChange, parent, subType, readOnly,
}) => {
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n, subType,
  )
    .map((option) => {
      const existingValue = values.find(v => v.id === option.id);
      return {
        ...option,
        level: existingValue ? existingValue.level : 0,
      };
    });

  if (options.length === 0) {
    return (<Label level="warning" fieldLabel={i18n.t(`${parent}.edit.${type}`)} />);
  }

  return (
    <Fragment>
      <p id="storySettingListSelect.label">
        {subType && i18n.t(`storySetting.types.${type}.subTypes.${subType}.title`)}
        {!subType && i18n.t(`storySetting.types.${type}.title`)}
      </p>
      <table className="table table-sm table-hover table-condensed">
        <thead>
          <tr key="storySettingList.head" className="row">
            <th className="col-3">Name</th>
            <th className="col-6">Description</th>
            <th className="col-3">Level</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr className="row">
              <td className="col-3">{option.label}</td>
              <td className="col-6"><Label level="info" fieldLabel={option.description} /></td>
              <td className="col-3">
                {readOnly && <Label level="warning" fieldLabel={option.level} /> }
                {!readOnly && (
                  <NumberInput onChange={e => onChange(option.value, e)} value={option.level} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

StorySettingListSelect.propTypes = {
  storySettingStore: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
  })),
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subType: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

StorySettingListSelect.defaultProps = {
  subType: undefined,
  readOnly: false,
  onChange: undefined,
  values: [],
};

export default StorySettingListSelect;
