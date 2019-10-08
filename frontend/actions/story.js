import storyDb from '../helpers/pouch/story';
import { constants } from '../constants';
import { removeChaptersFromStory, getChaptersByStories } from './chapter';
import { removeCharactersFromStory, getCharactersByStories } from './character';
import { removeStorySettingsFromStory, getStorySettingsByStories } from './storySetting';
import { removeItemsFromStory, getItemsByStories } from './item';
import { removeEventsFromStory, getEventsByStories } from './event';
import { removePlacesFromStory, getPlacesByStories } from './place';
import { removePowersFromStory, getPowersByStories } from './power';
import { getPowerAppliersByStories, removePowerAppliersFromStory } from './powerApplier';
import { removeEventItemsFromStory, getEventItemsByStories } from './eventItem';
import { removeEventPowersFromStory, getEventPowersByStories } from './eventPower';
import { removeEventTitlesFromStory, getEventTitlesByStories } from './eventTitle';
import { removeEventRelationsFromStory, getEventRelationsByStories } from './eventRelation';

export const addStory = async (story, dispatch) => {
  const newStory = await storyDb.insert(story);
  await getChaptersByStories([newStory], dispatch);
  await getCharactersByStories([newStory], dispatch);
  await getStorySettingsByStories([newStory], dispatch);
  await getItemsByStories([newStory], dispatch);
  await getEventsByStories([newStory], dispatch);
  await getEventItemsByStories([newStory], dispatch);
  await getEventPowersByStories([newStory], dispatch);
  await getEventRelationsByStories([newStory], dispatch);
  await getEventTitlesByStories([newStory], dispatch);
  await getPlacesByStories([newStory], dispatch);
  await getPowersByStories([newStory], dispatch);
  await getPowerAppliersByStories([newStory], dispatch);
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
  await removeEventItemsFromStory(story.id, dispatch);
  await removeEventPowersFromStory(story.id, dispatch);
  await removeEventRelationsFromStory(story.id, dispatch);
  await removeEventTitlesFromStory(story.id, dispatch);
  await removePlacesFromStory(story.id, dispatch);
  await removePowersFromStory(story.id, dispatch);
  await removePowerAppliersFromStory(story.id, dispatch);
  await storyDb.remove(story);
  dispatch({ type: constants.actions.removeStory, value: story });
};

export const getStories = async (userId, dispatch) => {
  const stories = await storyDb.getAll(userId);
  await getChaptersByStories(stories, dispatch);
  await getCharactersByStories(stories, dispatch);
  await getStorySettingsByStories(stories, dispatch);
  await getItemsByStories(stories, dispatch);
  await getEventsByStories(stories, dispatch);
  await getEventItemsByStories(stories, dispatch);
  await getEventPowersByStories(stories, dispatch);
  await getEventRelationsByStories(stories, dispatch);
  await getEventTitlesByStories(stories, dispatch);
  await getPlacesByStories(stories, dispatch);
  await getPowersByStories(stories, dispatch);
  await getPowerAppliersByStories(stories, dispatch);
  dispatch({
    type: constants.actions.setStories,
    value: stories,
  });
  return stories;
};
