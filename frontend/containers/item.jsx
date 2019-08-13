import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../components/generic/button';
import Tabs from '../components/generic/tabs';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';
import StorySettingLabel from '../components/storySettingLabel';
import StorySettingListSelect from '../components/storySettingListSelect';

const Item = (props) => {
  const {
    computedMatch, itemStore, storySettingStore, history, i18n,
  } = props;
  const { storyId, itemId } = computedMatch.params;
  const item = itemStore[itemId];
  const [activeTab, setActiveTab] = useState(i18n.t('item.view.tabs.statistic'));

  const handleChangeCharacter = () => {
    history.push(`/stories/${storyId}/items/${itemId}/edit`);
  };

  return (
    <div>
      <div className="container">
        <h3>{i18n.t('item.view.header', { title: item.name })}</h3>
        <p>{i18n.t('item.view.message')}</p>
        <Button color="green" toRight onClick={handleChangeCharacter}>{i18n.t('generic.edit')}</Button>
        <form className="form-horizontal">
          <h5>Character information</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={item.name} />
          <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={item.authorDescription} />
          <StorySettingLabel storyId={storyId} parent="item" type="item" i18n={i18n} storySettingStore={storySettingStore} value={item.type} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={item.description} />
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('item.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="item" type="trait" subType="statistic" values={item.statisticTraits} /> },
              { tabName: i18n.t('item.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} parent="item" type="trait" subType="statistic" values={item.reqStatisticTraits} /> },
            ]}
          />
        </form>
      </div>
    </div>
  );
};

Item.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(withRouter(Item));
