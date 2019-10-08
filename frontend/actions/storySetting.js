import actionBuilder from './actionBuilder';
import storySettingDb from '../helpers/pouch/storySetting';

const actions = actionBuilder(storySettingDb, 'StorySetting');

export const addStorySetting = async (
  storySetting, dispatch) => actions.add(storySetting, dispatch);

export const updateStorySetting = async (
  storySetting, dispatch) => actions.update(storySetting, dispatch);

export const importStorySetting = async (
  storySetting, dispatch) => actions.importData(storySetting, dispatch);

export const removeStorySetting = async (
  storySetting, dispatch) => actions.remove(storySetting, dispatch);

export const getStorySettings = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getStorySettingsByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeStorySettingsFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
