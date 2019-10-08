import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('Item');

export default reducer;

export const getItemsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
