import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getTargetTypes, getDamageTypes, getDamagePropTypes, getCalcTypes,
  getOptionsFromStorySetting, getYesNoOptions, isYes, useField,
} from '../../helpers';
import { constants } from '../../constants';
import { updatePowerApplier, addPowerApplier } from '../../actions/powerApplier';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndSaveBar from '../../components/backAndSaveBar';
import LabelAndField from '../../components/generic/labelAndField';
import Alert from '../../components/generic/alert';

const PowerApplierEdit = ({
  computedMatch, powerStore, powerApplierStore, storySettingStore, dispatch, i18n, mobile,
}) => {
  const { storyId, powerId, powerApplierId } = computedMatch.params;
  const powerApplier = powerApplierStore[powerApplierId] || {};
  const power = powerStore[powerId];

  const [updatedPowerApplier, setPowerApplierProps] = useField(powerApplier);

  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [validatedOnce, setValidatedOnce] = useState(false);

  const validate = () => {
    if ([
      updatedPowerApplier.targetType,
      updatedPowerApplier.damageType,
      updatedPowerApplier.damagePropType,
      updatedPowerApplier.calcType,
      updatedPowerApplier.amount,
    ].filter(x => x).length !== 5) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedPowerApplier.id) {
        await updatePowerApplier(updatedPowerApplier, dispatch);
      } else {
        await addPowerApplier({ ...updatedPowerApplier, storyId, powerId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/powers/${powerId}`} />;
  }

  const traitOptions = getOptionsFromStorySetting(storySettingStore, storyId, 'trait', i18n, 'statistic');

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('powerApplier.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('powerApplier.edit.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={power.name} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getTargetTypes(i18n)} label={i18n.t('powerApplier.targetType')} placeholder={i18n.t('powerApplier.placeholders.targetType')} {...setPowerApplierProps('targetType')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getDamageTypes(i18n)} label={i18n.t('powerApplier.damageType')} placeholder={i18n.t('powerApplier.placeholders.damageType')} {...setPowerApplierProps('damageType')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getDamagePropTypes(i18n)} label={i18n.t('powerApplier.damagePropType')} placeholder={i18n.t('powerApplier.placeholders.damagePropType')} {...setPowerApplierProps('damagePropType')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getCalcTypes(i18n)} label={i18n.t('powerApplier.calcType')} placeholder={i18n.t('powerApplier.placeholders.calcType')} {...setPowerApplierProps('calcType')} />
          <LabelAndField validatedOnce={validatedOnce} readOnly={updatedPowerApplier.calcType !== constants.calcTypes.percentage} type="select" options={traitOptions} label={i18n.t('powerApplier.basedOnTrait')} placeholder={i18n.t('powerApplier.placeholders.basedOnTrait')} {...setPowerApplierProps('basedOnTrait')} />
          <LabelAndField validatedOnce={validatedOnce} required type="number" label={i18n.t('powerApplier.amount')} placeholder={i18n.t('powerApplier.placeholders.amount')} {...setPowerApplierProps('amount')} />
          <LabelAndField validatedOnce={validatedOnce} readOnly={updatedPowerApplier.damagePropType !== constants.damagePropTypes.trait} type="select" options={traitOptions} label={i18n.t('powerApplier.affectedTrait')} placeholder={i18n.t('powerApplier.placeholders.affectedTrait')} {...setPowerApplierProps('affectedTrait')} />
          <LabelAndField validatedOnce={validatedOnce} required type="select" options={getYesNoOptions(i18n)} label={i18n.t('powerApplier.isEffect')} placeholder={i18n.t('powerApplier.placeholders.isEffect')} {...setPowerApplierProps('isEffect')} />
          <LabelAndField validatedOnce={validatedOnce} readOnly={!isYes(updatedPowerApplier.isEffect)} type="number" label={i18n.t('powerApplier.duration')} placeholder={i18n.t('powerApplier.placeholders.duration')} {...setPowerApplierProps('duration')} />
        </form>
      </div>
    </Fragment>
  );
};

PowerApplierEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  powerApplierStore: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PowerApplierEdit);
