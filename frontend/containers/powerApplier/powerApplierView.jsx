import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import {
  getTargetTypes, getDamageTypes, getDamagePropTypes, getCalcTypes,
  getOptionsFromStorySetting, getYesNoOptions,
} from '../../helpers';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndEditBar from '../../components/backAndEditBar';
import LabelAndText from '../../components/generic/labelAndText';

const PowerApplierView = ({
  computedMatch, storySettingStore, powerApplierStore, i18n, mobile, history,
}) => {
  const { storyId, powerId, powerApplierId } = computedMatch.params;
  const powerApplier = powerApplierStore[powerApplierId];
  const [completed, setCompleted] = useState(false);
  const traitOptions = getOptionsFromStorySetting(storySettingStore, storyId, 'trait', i18n, 'statistic');

  const handleChange = () => {
    history.push(`/stories/${storyId}/powers/${powerId}/powerAppliers/${powerApplierId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/powers/${powerId}`} />;
  }

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChange}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        <form className="form-horizontal">
          <h5>{i18n.t('powerApplier.view.header')}</h5>
          <LabelAndText type="select" options={getTargetTypes(i18n)} label={i18n.t('powerApplier.targetType')} value={powerApplier.targetType} />
          <LabelAndText type="select" options={getDamageTypes(i18n)} label={i18n.t('powerApplier.damageType')} value={powerApplier.damageType} />
          <LabelAndText type="select" options={getDamagePropTypes(i18n)} label={i18n.t('powerApplier.damagePropType')} value={powerApplier.damagePropType} />
          <LabelAndText type="select" options={getCalcTypes(i18n)} label={i18n.t('powerApplier.calcType')} value={powerApplier.calcType} />
          <LabelAndText type="select" options={traitOptions} label={i18n.t('powerApplier.basedOnTrait')} value={powerApplier.basedOnTrait} />
          <LabelAndText type="number" label={i18n.t('powerApplier.amount')} value={powerApplier.amount} />
          <LabelAndText type="select" options={traitOptions} label={i18n.t('powerApplier.affectedTrait')} value={powerApplier.affectedTrait} />
          <LabelAndText type="select" options={getYesNoOptions(i18n)} label={i18n.t('powerApplier.isEffect')} value={powerApplier.isEffect} />
          <LabelAndText type="number" label={i18n.t('powerApplier.duration')} value={powerApplier.duration} />
        </form>
      </div>
    </Fragment>
  );
};

PowerApplierView.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  powerApplierStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(PowerApplierView));
