import constants from '../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case constants.actions.addItem:
    case constants.actions.updateItem:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions.removeItem:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions.setItems: {
      const newState = { ...state };
      action.value.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    }
    case constants.actions.emptyItems: {
      return {};
    }
    case constants.actions.removeItems: {
      const newState = { ...state };
      action.value.forEach((item) => {
        newState[item.id] = undefined;
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getItemsByStory = (store, storyId) => Object.keys(store)
  .map(f => store[f])
  .filter(f => f.storyId === storyId);
