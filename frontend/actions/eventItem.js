import actionBuilder from './actionBuilder';
import eventItemDb from '../helpers/pouch/eventItem';

const actions = actionBuilder(eventItemDb, 'EventItem');

export const addEventItem = async (eventItem, dispatch) => actions.add(eventItem, dispatch);

export const updateEventItem = async (eventItem, dispatch) => actions.update(eventItem, dispatch);

export const importEventItem = async (
  eventItem, dispatch) => actions.importData(eventItem, dispatch);

export const removeEventItem = async (eventItem, dispatch) => actions.remove(eventItem, dispatch);

export const getEventItems = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getEventItemsByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeEventItemsFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
