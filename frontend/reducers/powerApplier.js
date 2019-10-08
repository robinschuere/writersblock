import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('PowerApplier');

export default reducer;

export const getPowerAppliersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getPowerAppliersByPower = (store, powerId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.powerId === powerId);
