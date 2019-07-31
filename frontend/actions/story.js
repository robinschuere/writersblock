import storyDb from '../helpers/pouch/story';
import constants from '../constants';
import { removeChaptersFromStory, getChaptersByStories } from './chapter';
import { removeCharactersFromStory, getCharactersByStories } from './character';
import { removeStorySettingsFromStory, getStorySettingsByStories } from './storySetting';
import { removeItemsFromStory, getItemsByStories } from './item';

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
  await removeChaptersFromStory(story.id, dispatch);
  await removeCharactersFromStory(story.id, dispatch);
  await removeStorySettingsFromStory(story.id, dispatch);
  await removeItemsFromStory(story.id, dispatch);
  await storyDb.remove(story);
  dispatch({ type: constants.actions.removeStory, value: story });
};

export const getStories = async (userId, dispatch) => {
  const stories = await storyDb.getAll(userId);
  dispatch({
    type: constants.actions.setStories,
    value: stories,
  });
  await getChaptersByStories(stories, dispatch);
  await getCharactersByStories(stories, dispatch);
  await getStorySettingsByStories(stories, dispatch);
  await getItemsByStories(stories, dispatch);
};
