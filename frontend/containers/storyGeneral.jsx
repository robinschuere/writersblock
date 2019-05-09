import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addStory, updateStory } from '../actions/story';

import Alert from '../components/generic/alert';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';

const StoryGeneral = ({
  computedMatch, storyStore, dispatch, userStore,
}) => {
  const { storyId } = computedMatch.params;
  const story = !storyId ? {} : storyStore[storyId];
  const userId = userStore.loggedInUser.id;

  const [name, setName] = useState(story.name);
  const [description, setDescription] = useState(story.description);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateStory = () => {
    if ([name].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateStory()) {
      const updatedStory = {
        ...story,
        name,
        description,
      };
      if (updatedStory.id) {
        await updateStory(updatedStory, dispatch);
      } else {
        await addStory({ ...updatedStory, userId }, dispatch);
      }
      setCompleted(true);
    }
    setAlert(true);
    return null;
  };

  if (completed) {
    return <Redirect to={storyId ? `/stories/${storyId}` : '/stories'} />;
  }

  return (
    <Fragment>
      <BackAndSaveBar onAccept={addOrUpdate} onClose={() => setCompleted(true)} />
      <div className="container">
        <h4>Story: General data</h4>
        {showAlert && <Alert message="You still need to enter some information" level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>Story information</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label="Name" onChange={setName} value={name} />
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label="Description" onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

StoryGeneral.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
};

export default WithNavBar(StoryGeneral);
