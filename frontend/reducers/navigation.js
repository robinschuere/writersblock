import { constants } from '../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.actions.setTabNavigation:
      return {
        ...state,
        [action.id]: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
