import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeStory } from '../actions/story';

import WithNavBar from '../components/hoc/withNavBar';
import BackAndSaveBar from '../components/backAndSaveBar';

const message = `
Are you sure to remove this story?
`;

const Story = ({
  computedMatch, storyStore, dispatch,
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
    <div className="container">
      <BackAndSaveBar onAccept={handleDelete} onClose={handleClose} />
      <h4>{`Remove story ${story.name}`}</h4>
      <p>{message}</p>
    </div>
  );
};

Story.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
};

export default WithNavBar(Story);
