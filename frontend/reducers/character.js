import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('Character');

export default reducer;

export const getCharactersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getCharactersForRelation = (store, storyId, characterId) => getCharactersByStory(
  store, storyId,
).filter(f => f.id !== characterId);
