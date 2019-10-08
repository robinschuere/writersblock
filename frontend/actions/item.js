import actionBuilder from './actionBuilder';
import itemDb from '../helpers/pouch/item';

const actions = actionBuilder(itemDb, 'Item');

export const addItem = async (
  item, dispatch) => actions.add(item, dispatch);

export const updateItem = async (
  item, dispatch) => actions.update(item, dispatch);

export const importItem = async (
  item, dispatch) => actions.importData(item, dispatch);

export const removeItem = async (
  item, dispatch) => actions.remove(item, dispatch);

export const getItems = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getItemsByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeItemsFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
