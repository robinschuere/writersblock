import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('EventTitle');

export default reducer;

export const getEventTitlesByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getEventTitlesByEvent = (store, eventId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.eventId === eventId);
