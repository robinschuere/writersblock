import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import RadarChart from 'react-svg-radar-chart';

import { constants } from '../constants';
import { getOptionsFromStorySetting, getViewOptions } from '../helpers';
import NumberInput from './generic/numberInput';
import Label from './generic/label';
import List from './generic/list';
import Alert from './generic/alert';
import LabelAndField from './generic/labelAndField';
import LabelAndText from './generic/labelAndText';

const StorySettingListSelect = ({
  storyStore, storySettingStore, storyId, values,
  type, i18n, onChange, subType, readOnly, mobile,
}) => {
  const [toggleView, setToggleView] = useState(constants.views.radar);

  const maximumTrait = storyStore[storyId].traitMaximum || 100;
  const withAuthorDescription = storyStore[storyId].withAuthorDescription || false;
  const options = getOptionsFromStorySetting(
    storySettingStore, storyId, type, i18n, subType, withAuthorDescription,
  )
    .map((option) => {
      const existingValue = values.find(v => v.id === option.value);
      return {
        ...option,
        level: existingValue ? existingValue.level : 0,
      };
    });

  if (options.length === 0) {
    return (<Alert level="warn" message={i18n.t(`storySetting.types.${type}.missing`)} />);
  }

  const calculateTotalPoints = () => {
    let value = 0;
    options.forEach((f) => { value += f.level; });
    return value;
  };

  const renderField = option => (
    <Fragment>
      {readOnly && <Label level="info" fieldLabel={option.level} />}
      {!readOnly && (
        <NumberInput
          max={maximumTrait}
          min={-maximumTrait}
          onChange={e => onChange(option.value, e)}
          value={option.level}
        />
      )}
    </Fragment>
  );

  const content = (
    <Fragment>
      {readOnly && (
        <LabelAndField type="toggle" name="radar" label={i18n.t('generic.view')} options={getViewOptions(i18n)} value={toggleView} onChange={setToggleView} />
      )}
      <LabelAndText type="number" name="radar" label={i18n.t('generic.total')} value={calculateTotalPoints()} />
    </Fragment>
  );

  if (readOnly && toggleView === constants.views.radar) {
    const captions = {};
    const data = {};
    const max = Math.max(...options.map(c => c.level)) || 0;
    options.forEach(((i) => {
      captions[i.id] = i.label;
      const value = i.level / max;
      data[i.id] = value;
    }));
    return (
      <Fragment>
        {content}
        <div className="d-flex justify-content-center">
          <RadarChart size={mobile ? 300 : 600} captions={captions} data={[{ data, meta: { color: 'blue' } }]} />
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {content}
      <List
        noView
        noSearch
        i18n={i18n}
        mobile={mobile}
        columns={[
          { columnName: i18n.t('generic.name'), fieldName: 'label' },
          { columnName: i18n.t('generic.level'), fieldName: 'level', renderField },
          { columnName: i18n.t('generic.description'), fieldName: 'description' },
        ]}
        items={options}
      />
    </Fragment>
  );
};

StorySettingListSelect.propTypes = {
  storyStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number,
  })),
  i18n: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
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
