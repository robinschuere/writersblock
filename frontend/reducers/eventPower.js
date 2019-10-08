import reducerBuilder from './reducerBuilder';

const reducer = reducerBuilder('EventPower');

export default reducer;

export const getEventPowersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);

export const getEventPowersByEvent = (store, eventId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.eventId === eventId);
