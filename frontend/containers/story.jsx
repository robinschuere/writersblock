import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import LabelAndText from '../components/generic/labelAndText';
import withNavBar from '../components/hoc/withNavBar';
import Button from '../components/generic/button';

const Story = ({
  computedMatch, storyStore, history, i18n,
}) => {
  const { storyId } = computedMatch.params;
  const story = storyStore[storyId];

  const handleChangeStory = () => {
    history.push(`/stories/${storyId}/edit`);
  };

  return (
    <div className="container">
      <h3>{i18n.t('story.view.header', { title: story.title })}</h3>
      <p>{i18n.t('story.view.message')}</p>
      <Button color="green" toRight onClick={handleChangeStory}>{i18n.t('generic.edit')}</Button>
      <form className="form-horizontal">
        <h4>General data</h4>
        <LabelAndText type="text" label={i18n.t('generic.title')} placeholder={i18n.t('generic.placeholders.title')} value={story.title} />
        <LabelAndText type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} value={story.description} />
      </form>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={`/stories/${storyId}/chapters`}>{i18n.t('navigation.chapters')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/stories/${storyId}/characters`}>{i18n.t('navigation.characters')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/stories/${storyId}/items`}>{i18n.t('navigation.items')}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/stories/${storyId}/storySettings`}>{i18n.t('navigation.storySettings')}</Link>
        </li>
      </ul>
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
