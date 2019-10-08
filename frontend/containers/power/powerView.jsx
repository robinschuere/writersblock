import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndEditBar from '../../components/backAndEditBar';
import StorySettingLabel from '../../components/storySettingLabel';
import { getStatTypes } from '../../helpers';
import Tabs from '../../components/generic/tabs';
import StorySettingListSelect from '../../components/storySettingListSelect';
import PowerApplierList from '../../components/powerApplierList';

const Power = (props) => {
  const {
    computedMatch, withAuthorDescription, powerStore, history, i18n, mobile, navigationStore,
  } = props;
  const { storyId, powerId } = computedMatch.params;
  const { path } = computedMatch;
  const power = powerStore[powerId];
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('power.view.tabs.statistic'));

  const handleChange = () => {
    history.push(`/stories/${storyId}/powers/${powerId}/edit`);
  };

  const handleAddApplier = () => {
    history.push(`/stories/${storyId}/powers/${powerId}/powerAppliers/new`);
  };

  const handleRemoveApplier = (item) => {
    history.push(`/stories/${storyId}/powers/${powerId}/powerAppliers/${item}/delete`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/powers`} />;
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
          <h5>{i18n.t('power.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={power.name} />
          {withAuthorDescription && (
            <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={power.authorDescription} />
          )}
          <StorySettingLabel {...props} storyId={storyId} type="power" value={power.type} />
          <LabelAndText type="toggle" options={getStatTypes(i18n)} label={i18n.t('generic.statType')} value={power.statType} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={power.description} />
        </form>
        <Tabs
          {...props}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('power.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={power.statisticTraits} /> },
            { tabName: i18n.t('power.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={power.statisticRequiredTraits} /> },
            { tabName: i18n.t('power.view.tabs.appliers'), render: () => <PowerApplierList {...props} storyId={storyId} powerId={powerId} onAdd={handleAddApplier} onRemove={handleRemoveApplier} /> },
          ]}
        />
      </div>
    </Fragment>
  );
};

Power.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  powerStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Power));
