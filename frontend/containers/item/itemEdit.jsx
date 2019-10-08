import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import { addItem, updateItem } from '../../actions/item';
import { isStorySettingWithSlot } from '../../reducers/storySetting';

import Alert from '../../components/generic/alert';
import Tabs from '../../components/generic/tabs';
import LabelAndField from '../../components/generic/labelAndField';
import BackAndSaveBar from '../../components/backAndSaveBar';
import WithNavBar from '../../components/hoc/withNavBar';
import StorySettingSelect from '../../components/storySettingSelect';
import {
  updateList, getSlotOptions, getYesNoOptions, useField,
} from '../../helpers';
import StorySettingListSelect from '../../components/storySettingListSelect';
import { constants } from '../../constants';

const ItemEdit = (props) => {
  const {
    computedMatch, withAuthorDescription, itemStore,
    storySettingStore, dispatch, i18n, mobile, navigationStore,
  } = props;
  const { storyId, itemId } = computedMatch.params;
  const { path } = computedMatch;
  const item = itemId ? itemStore[itemId] : { unique: constants.yesNo.no };

  const [updatedItem, setItemProps, setItemField] = useField(item);

  const [validatedOnce, setValidatedOnce] = useState(false);
  const [activeTab, setActiveTab] = useState(navigationStore[path] || i18n.t('item.view.tabs.statistic'));
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validate = () => {
    if ([updatedItem.name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const handleSetStatisticTrait = (id, level) => {
    const newArray = updateList(updatedItem.statisticTraits, { id, level });
    setItemField('statisticTraits')(newArray);
  };

  const handleSetReqStatisticTrait = (id, level) => {
    const newArray = updateList(updatedItem.statisticRequiredTraits, { id, level });
    setItemField('statisticRequiredTraits')(newArray);
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validate()) {
      if (updatedItem.id) {
        await updateItem(updatedItem, dispatch);
      } else {
        await addItem({ ...updatedItem, storyId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={`/stories/${storyId}/items`} />;
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
        {showAlert && <Alert message={i18n.t('item.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('item.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} {...setItemProps('name')} />
          {withAuthorDescription && (
            <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} {...setItemProps('authorDescription')} />
          )}
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="itemType" {...setItemProps('type')} />
          {(updatedItem.type && isStorySettingWithSlot(storySettingStore, updatedItem.type)) && (
            <LabelAndField validatedOnce={validatedOnce} type="select" label={i18n.t('slot.name')} placeholder={i18n.t('generic.placeholders.slot')} {...setItemProps('slotId')} options={getSlotOptions(i18n)} />
          )}
          <StorySettingSelect {...props} validatedOnce={validatedOnce} storyId={storyId} type="title" subType="item" {...setItemProps('titleId')} />
          <LabelAndField validatedOnce={validatedOnce} type="toggle" name="unique" options={getYesNoOptions(i18n)} label={i18n.t('generic.unique')} placeholder={i18n.t('generic.placeholders.unique')} {...setItemProps('unique')} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} {...setItemProps('description')} />
        </form>
        <Tabs
          {...props}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('item.view.tabs.statistic'), render: () => <StorySettingListSelect key="statistic" {...props} storyId={storyId} type="trait" subType="statistic" onChange={handleSetStatisticTrait} values={updatedItem.statisticTraits} /> },
            { tabName: i18n.t('item.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect key="statisticRequired" {...props} storyId={storyId} type="trait" subType="statistic" onChange={handleSetReqStatisticTrait} values={updatedItem.statisticRequiredTraits} /> },
          ]}
        />
      </div>
    </Fragment>
  );
};

ItemEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withAuthorDescription: PropTypes.bool.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  navigationStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(withRouter(ItemEdit));
