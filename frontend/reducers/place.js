import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('Place');

export default reducer;

export const getPlacesByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
