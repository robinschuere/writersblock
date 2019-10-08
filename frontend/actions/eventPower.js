import actionBuilder from './actionBuilder';
import eventPowerDb from '../helpers/pouch/eventPower';

const actions = actionBuilder(eventPowerDb, 'EventPower');

export const addEventPower = async (
  eventPower, dispatch) => actions.add(eventPower, dispatch);

export const updateEventPower = async (
  eventPower, dispatch) => actions.update(eventPower, dispatch);

export const importEventPower = async (
  eventPower, dispatch) => actions.importData(eventPower, dispatch);

export const removeEventPower = async (
  eventPower, dispatch) => actions.remove(eventPower, dispatch);

export const getEventPowers = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getEventPowersByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeEventPowersFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
