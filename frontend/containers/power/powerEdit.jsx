import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addPower, updatePower } from '../../actions/power';

import Alert from '../../components/generic/alert';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';
import { updateList, getStatTypes, useField } from '../../helpers';
import StorySettingListSelect from '../../components/storySettingListSelect';
import Tabs from '../../components/generic/tabs';

const PowerEdit = (props) => {
  const {
    computedMatch, withAuthorDescription,
    powerStore, dispatch, i18n, mobile, navigationStore,
  } = props;
  const { storyId, powerId } = computedMatch.params;
  const { path } = computedMatch;
  const power = !powerId ? {} : powerStore[powerId];

  const [updatedPower, setPowerProps, setPowerField] = useField(power);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('power.edit.tabs.statistic'));

  const validate = () => {
    if ([updatedPower.name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const handleSetStatisticRequiredTraits = (id, level) => {
    const newArray = updateList(updatedPower.statisticRequiredTraits, { id, level });
    setPowerField('statisticRequiredTraits')(newArray);
  };

  const handleSetStatisticTrait = (id, level) => {
    const newArray = updateList(updatedPower.statisticTraits, { id, level });
    setPowerField('statisticTraits')(newArray);
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedPower.id) {
        await updatePower(updatedPower, dispatch);
      } else {
        await addPower({ ...updatedPower, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/powers`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container-fluid">
        {showAlert && <Alert message={i18n.t('power.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('power.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setPowerProps('name')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setPowerProps('authorDescription')} />
          )}
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="power" {...setPowerProps('type')} />
          <LabelAndField validatedOnce={validatedOnce} type="toggle" options={getStatTypes(i18n)} label={i18n.t('generic.statType')} {...setPowerProps('statType')} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setPowerProps('description')} />
        </form>

        <Tabs
          {...props}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('power.edit.tabs.statistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} type="trait" subType="statistic" onChange={handleSetStatisticTrait} values={power.statisticTraits} /> },
            { tabName: i18n.t('power.edit.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} type="trait" subType="statistic" onChange={handleSetStatisticRequiredTraits} values={power.statisticRequiredTraits} /> },
          ]}
        />
      </div>
    </Fragment>
  );
};

PowerEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  storyStore: PropTypes.object.isRequired,
  powerStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(PowerEdit);
