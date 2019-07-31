import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addChapter:
    case constants.actions.updateChapter:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeChapter:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setChapters: {
      const newState = { ...state };
      action.value.forEach((chapter) => {
        newState[chapter.id] = chapter;
      });
      return newState;
    }
    case constants.actions.emptyChapters: {
      return {};
    }
    case constants.actions.removeChapters: {
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

export const getChaptersByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId)
  .sort((a, b) => a.counter - b.counter);
