import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('Event');

export default reducer;

export const getEventsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getEventsByChapter = (store, chapterId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.chapterId === chapterId);

export const getEventsByCharacter = (store, characterId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.characterId === characterId);

export const getEventTraitsByCharacter = (
  store, characterId, maxCounter,
) => getEventsByCharacter(store, characterId)
  .filter(f => f.counter <= maxCounter);
