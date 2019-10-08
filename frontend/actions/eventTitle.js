import actionBuilder from './actionBuilder';
import eventTitleDb from '../helpers/pouch/eventTitle';

const actions = actionBuilder(eventTitleDb, 'EventTitle');

export const addEventTitle = async (
  eventTitle, dispatch) => actions.add(eventTitle, dispatch);

export const updateEventTitle = async (
  eventTitle, dispatch) => actions.update(eventTitle, dispatch);

export const importEventTitle = async (
  eventTitle, dispatch) => actions.importData(eventTitle, dispatch);

export const removeEventTitle = async (
  eventTitle, dispatch) => actions.remove(eventTitle, dispatch);

export const getEventTitles = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getEventTitlesByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeEventTitlesFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
