import reducerBuilder from './reducerBuilder';
import { constants } from '../constants';

const reducer = reducerBuilder('StorySetting');

export default reducer;

export const getStorySettingsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const isStorySettingWithSlot = (store, storySettingId) => {
  const value = Object.keys(store)
    .map(f => store[f])
    .find(f => f.id === storySettingId);
  if (value) {
    return constants.itemSubTypesWithSlots.includes(value.subType);
  }
  return false;
};
