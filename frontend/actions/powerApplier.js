import actionBuilder from './actionBuilder';
import powerApplierDb from '../helpers/pouch/powerApplier';
import { constants } from '../constants';

const actions = actionBuilder(powerApplierDb, 'PowerApplier');

export const addPowerApplier = async (
  powerApplier, dispatch) => actions.add(powerApplier, dispatch);

export const updatePowerApplier = async (
  powerApplier, dispatch) => actions.update(powerApplier, dispatch);

export const importPowerApplier = async (
  powerApplier, dispatch) => actions.importData(powerApplier, dispatch);

export const removePowerApplier = async (
  powerApplier, dispatch) => actions.remove(powerApplier, dispatch);

export const getPowerAppliers = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getPowerAppliersByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removePowerAppliersFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);

export const removePowerAppliersFromPower = async (powerId, dispatch) => {
  const appliers = await powerApplierDb.getAllByPowerId(powerId);
  await Promise.all(appliers.map(c => powerApplierDb.remove(c)));
  dispatch({
    type: constants.actions.removePowerAppliers,
    value: appliers,
  });
};
