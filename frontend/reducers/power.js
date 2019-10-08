import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('Power');

export default reducer;

export const getPowersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
