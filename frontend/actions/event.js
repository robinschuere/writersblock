import eventsDb from '../helpers/pouch/event';
import constants from '../constants';

export const addEvent = async (event, dispatch) => {
  const newSetting = await eventsDb.insert(event);
  dispatch({
    type: constants.actions.addEvent,
    value: newSetting,
  });
};

export const updateEvent = async (event, dispatch) => {
  const updatedEvent = await eventsDb.update(event);
  dispatch({
    type: constants.actions.updateEvent,
    value: updatedEvent,
  });
};

export const removeEvent = async (event, dispatch) => {
  await eventsDb.remove(event);
  dispatch({ type: constants.actions.removeEvent, value: event });
};

export const getEvents = async (storyId, dispatch) => {
  const events = await eventsDb.getAll(storyId);
  dispatch({
    type: constants.actions.setEvents,
    value: events,
  });
};

export const getEventsByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getEvents(s.id, dispatch)));
};

export const removeEventsFromStory = async (storyId, dispatch) => {
  const events = await eventsDb.getAll(storyId);
  await Promise.all(events.map(c => eventsDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    value: events,
  });
};

export const removeEventsFromCharacter = async (characterId, dispatch) => {
  const events = await eventsDb.getAllByCharacterId(characterId);
  await Promise.all(events.map(c => eventsDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    value: events,
  });
};

export const removeEventsFromChapter = async (chapterId, dispatch) => {
  const events = await eventsDb.getAllByCharacterId(chapterId);
  await Promise.all(events.map(c => eventsDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    value: events,
  });
};
