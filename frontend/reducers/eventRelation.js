import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('EventRelation');

export default reducer;

export const getEventRelationsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getEventRelationsByEvent = (store, eventId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.eventId === eventId);
