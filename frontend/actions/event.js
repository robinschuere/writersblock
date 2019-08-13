import eventDb from '../helpers/pouch/event';
import constants from '../constants';

export const addEvent = async (event, dispatch) => {
  const newSetting = await eventDb.insert(event);
  dispatch({
    type: constants.actions.addEvent,
    value: newSetting,
  });
};

export const updateEvent = async (event, dispatch) => {
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
    value: events,
  });
};

export const removeEventsFromCharacter = async (characterId, dispatch) => {
  const events = await eventDb.getAllByCharacterId(characterId);
  await Promise.all(events.map(c => eventDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    value: events,
  });
};

export const removeEventsFromChapter = async (chapterId, dispatch) => {
  const events = await eventDb.getAllByCharacterId(chapterId);
  await Promise.all(events.map(c => eventDb.remove(c)));
  dispatch({
    type: constants.actions.removeEvents,
    value: events,
  });
};
