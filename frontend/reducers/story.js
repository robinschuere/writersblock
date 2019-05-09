import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addStory:
    case constants.actions.updateStory:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeStory:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setStories: {
      const newState = {};
      action.value.forEach((story) => {
        newState[story.id] = story;
      });
      return newState;
    }
    case constants.actions.emptyStories: {
      return {};
    }

    default:
      return state;
  }
};

export default reducer;
