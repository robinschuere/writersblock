/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addItem, updateItem } from '../actions/item';

import Alert from '../components/generic/alert';
import Tabs from '../components/generic/tabs';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';
import StorySettingSelect from '../components/storySettingSelect';
import { updateStorySettingList } from '../helpers';
import StorySettingListSelect from '../components/storySettingListSelect';

const ItemEdit = (props) => {
  const {
    computedMatch, itemStore, storySettingStore, dispatch, i18n,
  } = props;
  const { storyId, itemId } = computedMatch.params;
  const item = !itemId ? {} : itemStore[itemId];

  const [name, setName] = useState(item.name);
  const [authorDescription, setAuthorDescription] = useState(item.authorDescription);
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [statisticTraits, setStatisticTraits] = useState(item.statisticTraits || []);
  const [reqStatisticTraits, setReqStatisticTraits] = useState(item.reqStatisticTraits || []);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [activeTab, setActiveTab] = useState(i18n.t('item.view.tabs.statistic'));
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateItem = () => {
    if ([name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const handleSetStatisticTrait = (id, level) => {
    const newArray = updateStorySettingList(statisticTraits, { id, level });
    setStatisticTraits(newArray);
  };

  const handleSetReqStatisticTrait = (id, level) => {
    const newArray = updateStorySettingList(reqStatisticTraits, { id, level });
    setReqStatisticTraits(newArray);
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateItem()) {
      const updatedItem = {
        ...item,
        name,
        authorDescription,
        type,
        description,
        statisticTraits,
      };
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
    return <Redirect to={itemId ? `/stories/${storyId}/items/${itemId}` : `/stories/${storyId}/items`} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={addOrUpdate} onClose={() => setCompleted(true)} i18n={i18n} />
      <div className="container">
        {showAlert && <Alert message={i18n.t('item.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('item.edit.header')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.name')} placeholder={i18n.t('generic.placeholders.name')} onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.authorDescription')} placeholder={i18n.t('generic.placeholders.authorDescription')} onChange={setAuthorDescription} value={authorDescription} />
          <StorySettingSelect validatedOnce={validatedOnce} storyId={storyId} parent="item" type="item" i18n={i18n} storySettingStore={storySettingStore} onChange={setType} value={type} />
          <LabelAndField validatedOnce={validatedOnce} type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabValues={[
            { tabName: i18n.t('item.view.tabs.statistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} parent="item" type="trait" subType="statistic" onChange={handleSetStatisticTrait} values={statisticTraits} /> },
            { tabName: i18n.t('item.view.tabs.requiredStatistic'), render: () => <StorySettingListSelect {...props} storyId={storyId} parent="item" type="trait" subType="statistic" onChange={handleSetReqStatisticTrait} values={reqStatisticTraits} /> },
          ]}
        />
      </div>
    </Fragment>
  );
};

ItemEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemStore: PropTypes.object.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(ItemEdit);
