import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addCharacter:
    case constants.actions.updateCharacter:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeCharacter:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setCharacters: {
      const newState = { ...state };
      action.value.forEach((character) => {
        newState[character.id] = character;
      });
      return newState;
    }
    case constants.actions.emptyCharacters: {
      return {};
    }
    case constants.actions.removeCharacters: {
      const newState = { ...state };
      action.value.forEach((character) => {
        newState[character.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getCharactersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
