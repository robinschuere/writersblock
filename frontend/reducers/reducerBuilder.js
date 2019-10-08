import { constants } from '../constants';

const reducer = objectName => (state = {}, action) => {
  switch (action.type) {
    case undefined:
      return state;
    case constants.actions[`add${objectName}`]:
    case constants.actions[`update${objectName}`]:
      return {
        ...state,
        [action.value.id]: action.value,
      };
    case constants.actions[`remove${objectName}`]:
      delete state[action.value.id]; // eslint-disable-line no-param-reassign
      return state;
    case constants.actions[`set${objectName}s`]: {
      const newState = { ...state };
      action.value.forEach((v) => {
        newState[v.id] = v;
      });
      return newState;
    }
    case constants.actions[`empty${objectName}`]:
      return {};
    case constants.actions[`remove${objectName}s`]: {
      const newState = { ...state };
      action.values.forEach((v) => {
        delete newState[v.id];
      });
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
