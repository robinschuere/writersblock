import storyDb from '../helpers/pouch/story';
import constants from '../constants';
import { removeChaptersFromStory, getChaptersByStories } from './chapter';
import { removeCharactersFromStory, getCharactersByStories } from './character';
import { removeStorySettingsFromStory, getStorySettingsByStories } from './storySetting';
import { removeItemsFromStory, getItemsByStories } from './item';
import { removeEventsFromStory, getEventsByStories } from './event';
import { removeRelationsFromStory, getRelationsByStories } from './relation';
import { removePlacesFromStory, getPlacesByStories } from './place';

export const addStory = async (story, dispatch) => {
  const newStory = await storyDb.insert(story);
  dispatch({
    type: constants.actions.addStory,
    value: newStory,
  });
  await getChaptersByStories([newStory], dispatch);
  await getCharactersByStories([newStory], dispatch);
  await getStorySettingsByStories([newStory], dispatch);
  await getItemsByStories([newStory], dispatch);
  await getEventsByStories([newStory], dispatch);
  await getPlacesByStories([newStory], dispatch);
  await getRelationsByStories([newStory], dispatch);
};

export const updateStory = async (story, dispatch) => {
  const updatedStory = await storyDb.update(story);
  dispatch({
    type: constants.actions.updateStory,
    value: updatedStory,
  });
};

export const importStory = async (story, dispatch) => {
  const imported = await storyDb.importData(story);
  dispatch({
    type: constants.actions.updateStory,
    value: imported,
  });
};

export const removeStory = async (story, dispatch) => {
  await removeChaptersFromStory(story.id, dispatch);
  await removeCharactersFromStory(story.id, dispatch);
  await removeStorySettingsFromStory(story.id, dispatch);
  await removeItemsFromStory(story.id, dispatch);
  await removeEventsFromStory(story.id, dispatch);
  await removeRelationsFromStory(story.id, dispatch);
  await removePlacesFromStory(story.id, dispatch);
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
  await getEventsByStories(stories, dispatch);
  await getRelationsByStories(stories, dispatch);
  await getPlacesByStories(stories, dispatch);
  return stories;
};
