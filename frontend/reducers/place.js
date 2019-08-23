import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addPlace:
    case constants.actions.updatePlace:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removePlace:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setPlaces: {
      const newState = { ...state };
      action.value.forEach((place) => {
        newState[place.id] = place;
      });
      return newState;
    }
    case constants.actions.emptyPlaces: {
      return {};
    }
    case constants.actions.removePlaces: {
      const newState = { ...state };
      action.value.forEach((place) => {
        newState[place.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getPlacesByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
