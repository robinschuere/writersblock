import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Tabs from '../../components/generic/tabs';
import WithNavBar from '../../components/hoc/withNavBar';
import LabelAndText from '../../components/generic/labelAndText';
import BackAndEditBar from '../../components/backAndEditBar';
import StorySettingLabel from '../../components/storySettingLabel';
import StorySettingListSelect from '../../components/storySettingListSelect';
import { isStorySettingWithSlot } from '../../reducers/storySetting';
import { getSlotOptions, getYesNoOptions } from '../../helpers';

const Item = (props) => {
  const {
    computedMatch, withAuthorDescription, itemStore,
    history, i18n, mobile, storySettingStore, navigationStore,
  } = props;
  const { storyId, itemId } = computedMatch.params;
  const { path } = computedMatch;
  const item = itemStore[itemId];
  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('item.view.tabs.statistic'));
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
      <div className="container-fluid">
        <form className="form-horizontal">
          <h5>{i18n.t('item.view.header')}</h5>
          <LabelAndText type="text" label={i18n.t('generic.name')} value={item.name} />
          {withAuthorDescription && (
            <LabelAndText type="textarea" label={i18n.t('generic.authorDescription')} value={item.authorDescription} />
          )}
          <StorySettingLabel {...props} storyId={storyId} type="itemType" value={item.type} />
          {(item.type && isStorySettingWithSlot(storySettingStore, item.type)) && (
            <LabelAndText type="select" label={i18n.t('slot.name')} placeholder={i18n.t('generic.placeholders.slot')} value={item.slotId} options={getSlotOptions(i18n)} />
          )}
          <StorySettingLabel {...props} storyId={storyId} type="title" value={item.titleId} />
          <LabelAndText type="toggle" name="unique" options={getYesNoOptions(i18n)} label={i18n.t('generic.unique')} value={item.unique} />
          <LabelAndText type="textarea" label={i18n.t('generic.description')} value={item.description} />
          <Tabs
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabValues={[
              { tabName: i18n.t('item.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={item.statisticTraits} /> },
              { tabName: i18n.t('item.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} readOnly storyId={storyId} type="trait" subType="statistic" values={item.statisticRequiredTraits} /> },
            ]}
          />
        </form>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  computedMatch: PropTypes.object.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(Item));
