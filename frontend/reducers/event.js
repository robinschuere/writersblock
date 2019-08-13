import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addEvent:
    case constants.actions.updateEvent:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeEvent:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setEvents: {
      const newState = { ...state };
      action.value.forEach((event) => {
        newState[event.id] = event;
      });
      return newState;
    }
    case constants.actions.emptyEvents: {
      return {};
    }
    case constants.actions.removeEvents: {
      const newState = { ...state };
      action.value.forEach((event) => {
        newState[event.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

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
