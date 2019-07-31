import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addStorySetting:
    case constants.actions.updateStorySetting:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeStorySetting:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setStorySettings: {
      const newState = { ...state };
      action.value.forEach((chapter) => {
        newState[chapter.id] = chapter;
      });
      return newState;
    }
    case constants.actions.emptyStorySettings: {
      return {};
    }
    case constants.actions.removeStorySettings: {
      const newState = { ...state };
      action.value.forEach((chapter) => {
        newState[chapter.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getStorySettingsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
