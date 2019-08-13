import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { addStory, updateStory } from '../actions/story';

import Alert from '../components/generic/alert';
import LabelAndField from '../components/generic/labelAndField';
import BackAndSaveBar from '../components/backAndSaveBar';
import WithNavBar from '../components/hoc/withNavBar';

const StoryEdit = ({
  computedMatch, storyStore, dispatch, userStore, i18n, mobile,
}) => {
  const { storyId } = computedMatch.params;
  const story = !storyId ? {} : storyStore[storyId];
  const userId = userStore.loggedInUser.id;

  const [title, setTitle] = useState(story.title);
  const [description, setDescription] = useState(story.description);
  const [validatedOnce, setValidatedOnce] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [completed, setCompleted] = useState(false);

  const validateStory = () => {
    if ([title].filter(x => x).length !== 1) {
      return false;
    }
    return true;
  };

  const addOrUpdate = async () => {
    setValidatedOnce(true);
    if (validateStory()) {
      const updatedStory = {
        ...story,
        title,
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
      <BackAndSaveBar
        mobile={mobile}
        onAccept={addOrUpdate}
        onClose={() => setCompleted(true)}
        i18n={i18n}
      />
      <div className="container">
        <h4>{i18n.t('story.edit.header')}</h4>
        {showAlert && <Alert message={i18n.t('story.edit.alert')} level="error" onClose={setAlert(false)} />}
        <form className="form-horizontal">
          <h5>{i18n.t('story.edit.subHeader')}</h5>
          <LabelAndField validatedOnce={validatedOnce} required type="text" label={i18n.t('generic.title')} placeholder={i18n.t('generic.placeholders.title')} onChange={setTitle} value={title} />
          <LabelAndField validatedOnce={validatedOnce} required type="textarea" label={i18n.t('generic.description')} placeholder={i18n.t('generic.placeholders.description')} onChange={setDescription} value={description} />
        </form>
      </div>
    </Fragment>
  );
};

StoryEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userStore: PropTypes.object.isRequired,
  storyStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(StoryEdit);
