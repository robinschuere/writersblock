import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../components/generic/button';
import WithNavBar from '../components/hoc/withNavBar';
import LabelAndText from '../components/generic/labelAndText';
import StorySettingLabel from '../components/storySettingLabel';
import StorySettingListSelect from '../components/storySettingListSelect';

const Item = ({
  computedMatch, itemStore, storySettingStore, history, i18n,
}) => {
  const { storyId, itemId } = computedMatch.params;
  const item = itemStore[itemId];

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
          <StorySettingListSelect readOnly storyId={storyId} parent="item" type="trait" subType="statistic" i18n={i18n} storySettingStore={storySettingStore} values={item.statisticTraits} />
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
