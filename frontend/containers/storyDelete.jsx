import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeStory } from '../actions/story';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const Story = ({
  computedMatch, storyStore, dispatch, i18n,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId } = computedMatch.params;
  const story = storyStore[storyId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeStory(story, dispatch);
    handleClose();
  };

  if (completed) {
    return <Redirect to="/stories" />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container">
        <h4>{i18n.t('story.delete.header', { title: story.title })}</h4>
        <p>{i18n.t('story.delete.message')}</p>
      </div>
    </Fragment>
  );
};

Story.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

export default WithNavBar(Story);
