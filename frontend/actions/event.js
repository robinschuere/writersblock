import eventDb from '../helpers/pouch/event';
import { constants } from '../constants';

const updateExistingEventCounterForAddedCharacter = async (event, dispatch) => {
  const existingEvents = await eventDb.getAllByCharacterId(event.characterId);
  const existingEventsToUpdate = existingEvents.filter(e => e.counter >= event.counter);

  await Promise.all(existingEventsToUpdate.map(async (e) => {
    e.counter += 1;
    const updatedEvent = await eventDb.update(e);
    dispatch({
      type: constants.actions.updateEvent,
      value: updatedEvent,
    });
  }));
};

const updateExistingEventCounterForCharacter = async (event, originalEventCounter, dispatch) => {
  const existingEvents = await eventDb.getAllByCharacterId(event.characterId);
  const change = originalEventCounter > event.counter ? 1 : -1;
  const bigCounter = originalEventCounter > event.counter ? originalEventCounter : event.counter;
  const smallCounter = originalEventCounter > event.counter ? event.counter : originalEventCounter;

  const existingEventsToUpdate = existingEvents
    .filter(e => e.id !== event.id && e.counter >= smallCounter && e.counter <= bigCounter);

  await Promise.all(existingEventsToUpdate.map(async (e) => {
    e.counter += change;
    const updatedEvent = await eventDb.update(e);
    dispatch({
      type: constants.actions.updateEvent,
      value: updatedEvent,
    });
  }));
};

const getCounter = async (characterId) => {
  const events = await eventDb.getAllByCharacterId(characterId);
  return events.length > 0 ? Math.max(...events.map(c => c.counter)) : 0;
};

export const addEvent = async (event, dispatch) => {
  const latestCounter = await getCounter(event.characterId);
  const eventWithCounter = { ...event, counter: event.counter || latestCounter + 1 };
  if (eventWithCounter !== latestCounter + 1) {
    await updateExistingEventCounterForAddedCharacter(eventWithCounter, dispatch);
  }
  const newEvent = await eventDb.insert(eventWithCounter);
  dispatch({
    type: constants.actions.addEvent,
    value: newEvent,
  });
};

export const updateEvent = async (event, dispatch) => {
  const originalEvent = await eventDb.getById(event.id);
  if (originalEvent.counter !== event.counter) {
    await updateExistingEventCounterForCharacter(event, originalEvent.counter, dispatch);
  }
  const updatedEvent = await eventDb.update(event);
  dispatch({
    type: constants.actions.updateEvent,
    value: updatedEvent,
  });
};

export const importEvent = async (event, dispatch) => {
  const imported = await eventDb.importData(event);
  dispatch({
    type: constants.actions.addEvent,
    value: imported,
  });
};

export const removeEvent = async (event, dispatch) => {
  await eventDb.remove(event);
  dispatch({ type: constants.actions.removeEvent, value: event });
};

export const getEvents = async (storyId, dispatch) => {
  const events = await eventDb.getAll(storyId);
  dispatch({
    type: constants.actions.setEvents,
    value: events,
  });
};

export const getEventsByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getEvents(s.id, dispatch)));
};

export const removeEventsFromStory = async (storyId, dispatch) => {
  const events = await eventDb.getAll(storyId);
  await Promise.all(events.map(c => eventDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    values: events,
  });
};

export const removeEventsFromCharacter = async (characterId, dispatch) => {
  const events = await eventDb.getAllByCharacterId(characterId);
  await Promise.all(events.map(c => eventDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    values: events,
  });
};

export const removeEventsFromChapter = async (chapterId, dispatch) => {
  const events = await eventDb.getAllByCharacterId(chapterId);
  await Promise.all(events.map(c => eventDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    values: events,
  });
};
