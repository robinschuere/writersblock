import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LabelAndText from '../../components/generic/labelAndText';
import withNavBar from '../../components/hoc/withNavBar';
import Button from '../../components/generic/button';
import { getStoryStatusOptions, getYesNoOptions } from '../../helpers';

const Story = ({
  computedMatch, storyStore, history, i18n,
}) => {
  const { storyId } = computedMatch.params;
  const story = storyStore[storyId];

  const handleChangeStory = () => {
    history.push(`/stories/${storyId}/edit`);
  };

  return (
    <div className="container-fluid">
      <h3>{i18n.t('story.view.header', { title: story.title })}</h3>
      <Button color="green" toRight onClick={handleChangeStory}>{i18n.t('generic.edit')}</Button>
      <form className="form-horizontal">
        <h4>General data</h4>
        <LabelAndText type="text" label={i18n.t('generic.title')} placeholder={i18n.t('generic.placeholders.title')} value={story.title} />
        <LabelAndText type="select" options={getStoryStatusOptions(i18n)} label={i18n.t('generic.status')} placeholder={i18n.t('generic.placeholders.status')} value={story.status} />
        <LabelAndText type="toggle" name="markdown" options={getYesNoOptions(i18n)} label={i18n.t('generic.withMarkdown')} placeholder={i18n.t('generic.placeholders.markdown')} value={story.withMarkdown} />
        <LabelAndText type="toggle" name="author" options={getYesNoOptions(i18n)} label={i18n.t('generic.withAuthorDescription')} placeholder={i18n.t('generic.placeholders.withAuthorDescription')} value={story.withAuthorDescription} />
        <LabelAndText type="number" label={i18n.t('generic.traitMaximum')} placeholder={i18n.t('generic.placeholders.traitMaximum')} value={story.traitMaximum} />
        <LabelAndText type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} value={story.description} />
      </form>
    </div>
  );
};

Story.propTypes = {
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default withNavBar(withRouter(Story));
