import {
  GET_CHARACTERS,
  LOGIN_USER,
} from '../constants.js';

export default function characters(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return Object.assign({}, state, {charactersLoaded: true});
    case LOGIN_USER:
      return Object.assign({}, state, {userLoggedIn: true});
    default:
      return state;
  }
}