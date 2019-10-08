import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('EventItem');

export default reducer;

export const getEventItemsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getEventItemsByEvent = (store, eventId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.eventId === eventId);
