import {
  LOGIN_USER,
} from '../constants.js';

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user;
    default:
      return state;
  }
}