import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  formatDate, getStorySettingOption, getStorySettingSubTypeOption, getDefaultStorySettings,
} from '../helpers';
import { addStorySetting } from '../actions/storySetting';

import List from './generic/list';
import Button from './generic/button';

const StorySettingList = ({
  computedMatch, mobile, storySettingStore, history, i18n, dispatch,
}) => {
  const { storyId } = computedMatch.params;
  const storySettings = Object.keys(storySettingStore)
    .map(key => ({
      ...storySettingStore[key],
    }))
    .filter(c => c.storyId === storyId)
    .sort((a, b) => a.counter - b.counter);

  const handleAdd = () => {
    history.push(`/stories/${storyId}/storySettings/new`);
  };

  const handleAddDefault = async () => {
    const defaults = getDefaultStorySettings(storyId, i18n);
    await Promise.all(defaults.map(d => addStorySetting(d, dispatch)));
  };

  const handleStartRemove = (item) => {
    history.push(`/stories/${storyId}/storySettings/${item.id}/delete`);
  };

  return (
    <Fragment>
      {storySettings.length === 0 && <Button onClick={handleAddDefault}>{i18n.t('storySetting.list.default')}</Button>}
      <List
        i18n={i18n}
        onAdd={handleAdd}
        onRemove={handleStartRemove}
        mobile={mobile}
        linkToPath="storySettings"
        columns={[
          { columnName: i18n.t('generic.name'), fieldName: 'name' },
          { columnName: i18n.t('generic.type'), fieldName: 'type', format: getStorySettingOption },
          {
            columnName: i18n.t('generic.subType'), fieldName: 'subType', format: getStorySettingSubTypeOption, formatFields: ['type', 'subType'],
          },
          { columnName: i18n.t('generic.authorDescription'), fieldName: 'authorDescription' },
          { columnName: i18n.t('generic.createdAt'), fieldName: 'createdAt', format: formatDate },
          { columnName: i18n.t('generic.updatedAt'), fieldName: 'updatedAt', format: formatDate },
        ]}
        items={storySettings}
      />
    </Fragment>
  );
};

StorySettingList.propTypes = {
  mobile: PropTypes.bool.isRequired,
  computedMatch: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withRouter(StorySettingList);
