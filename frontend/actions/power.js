import actionBuilder from './actionBuilder';
import powerDb from '../helpers/pouch/power';
import { removePowerAppliersFromPower } from './powerApplier';

const actions = actionBuilder(powerDb, 'Power');

export const addPower = async (
  power, dispatch) => actions.add(power, dispatch);

export const updatePower = async (
  power, dispatch) => actions.update(power, dispatch);

export const importPower = async (
  power, dispatch) => actions.importData(power, dispatch);

export const removePower = async (power, dispatch) => {
  await actions.remove(power, dispatch);
  await removePowerAppliersFromPower(power.id, dispatch);
};

export const getPowers = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getPowersByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removePowersFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
