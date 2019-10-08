import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeStory } from '../../actions/story';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const Story = ({
  computedMatch, storyStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId } = computedMatch.params;
  const story = storyStore[storyId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeStory(story, dispatch);
    setCompleted(true);
  };

  if (completed || !story) {
    return <Redirect to="/stories" />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar
        mobile={mobile}
        onAccept={handleDelete}
        onClose={handleClose}
        i18n={i18n}
      />
      <div className="container-fluid">
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
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(Story);
