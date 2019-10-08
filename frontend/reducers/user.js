import { constants } from '../constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case constants.actions.addUser:
      return { loggedInUser: action.value };
    case constants.actions.loginUser:
      return { loggedInUser: action.value };
    case constants.actions.updateUser:
      return { loggedInUser: action.value };
    case constants.actions.logoutUser:
      return { loggedInUser: undefined };
    default:
      return state;
  }
};

export default reducer;
