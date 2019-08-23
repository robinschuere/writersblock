import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Tabs from '../../components/generic/tabs';
import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndEditBar from '../../components/backAndEditBar';
import StorySettingLabel from '../../components/storySettingLabel';
import StorySettingListSelect from '../../components/storySettingListSelect';

const Item = (props) => {
  const {
    computedMatch, itemStore, storySettingStore, history, i18n, mobile,
  } = props;
  const { storyId, itemId } = computedMatch.params;
  const item = itemStore[itemId];
  const [activeTab, setActiveTab] = useState(i18n.t('item.view.tabs.statistic'));
  const [completed, setCompleted] = useState(false);

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/items/${itemId}/edit`);
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/items`} />;
  }

  return (
    <Fragment>
      <BackAndEditBar
        mobile={mobile}
        onAccept={handleChangeCharacter}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        <form className="form-horizontal">
          <h5>Character information</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={item.name} />
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={item.authorDescription} />
          <StorySettingLabel storyId={storyId} type="itemType" i18n={i18n} storySettingStore={storySettingStore} value={item.type} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={item.description} />
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('item.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={item.statisticTraits} /> },
              { tabName: i18n.t('item.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={item.reqStatisticTraits} /> },
            ]}
          />
        </form>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Item));
