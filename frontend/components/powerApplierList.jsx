import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import List from './generic/list';

import {
  getOptionsFromStorySetting, formatYesNo, formatGenericValueTypes, formatTraitOptions,
} from '../helpers';
import Icon from './generic/icon';
import { getPowerAppliersByPower } from '../reducers/powerApplier';

const PowerApplierList = ({
  onAdd, onRemove, mobile, i18n, storySettingStore, storyId, powerId, powerApplierStore,
}) => {
  const appliers = getPowerAppliersByPower(powerApplierStore, powerId);
  const renderColumnIcon = (icon, color) => (
    <Icon name={icon} color={color} />
  );

  const renderMultiIconColumns = (icons) => {
    const content = [];
    icons.forEach((i, index) => {
      content.push(renderColumnIcon(i));
      if (index !== icons.length - 1) {
        content.push(<span> | </span>);
      }
    });
    return (
      <Fragment style={{ textAlign: 'center' }}>
        {content}
      </Fragment>
    );
  };

  const traitOptions = getOptionsFromStorySetting(storySettingStore, storyId, 'trait', i18n, 'statistic')
    .map(c => ({ ...c, label: c.label.substr(0, 3).toUpperCase() }));

  return (
    <Fragment>
      <List
        noSearch
        onAdd={onAdd}
        onRemove={onRemove}
        i18n={i18n}
        mobile={mobile}
        linkToPath={`${powerId}/powerAppliers`}
        columns={[
          { renderColumnHeader: renderColumnIcon('crosshairs'), fieldName: 'targetType', format: formatGenericValueTypes },
          { renderColumnHeader: renderColumnIcon('bolt'), fieldName: 'damageType', format: formatGenericValueTypes },
          { renderColumnHeader: renderColumnIcon('arrow-down'), fieldName: 'damagePropType', format: formatGenericValueTypes },
          { renderColumnHeader: renderMultiIconColumns(['percentage', 'hashtag']), fieldName: 'calcType', format: formatGenericValueTypes },
          { renderColumnHeader: renderColumnIcon('book'), fieldName: 'basedOnTrait', format: formatTraitOptions(traitOptions) },
          { renderColumnHeader: renderColumnIcon('hashtag'), fieldName: 'amount' },
          { renderColumnHeader: renderColumnIcon('book', 'red'), fieldName: 'affectedTrait', format: formatTraitOptions(traitOptions) },
          { renderColumnHeader: renderColumnIcon('skull-crossbones'), fieldName: 'isEffect', format: formatYesNo },
          { renderColumnHeader: renderColumnIcon('clock'), fieldName: 'duration' },
        ]}
        items={appliers}
      />
    </Fragment>
  );
};

PowerApplierList.propTypes = {
  powerId: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  powerApplierStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  mobile: PropTypes.bool.isRequired,
  storyId: PropTypes.string.isRequired,
};

export default PowerApplierList;
