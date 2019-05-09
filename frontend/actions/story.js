import storyDb from '../helpers/pouch/story';
import constants from '../constants';

export const addStory = async (story, dispatch) => {
  const newStory = await storyDb.insert(story);
  dispatch({
    type: constants.actions.addStory,
    value: newStory,
  });
};

export const updateStory = async (story, dispatch) => {
  const updatedStory = await storyDb.update(story);
  dispatch({
    type: constants.actions.updateStory,
    value: updatedStory,
  });
};

export const removeStory = async (story, dispatch) => {
  await storyDb.remove(story);
  dispatch({ type: constants.actions.removeStory, value: story });
};

export const getStories = async (userId, dispatch) => {
  const stories = await storyDb.getAll(userId);
  dispatch({
    type: constants.actions.setStories,
    value: stories,
  });
};
