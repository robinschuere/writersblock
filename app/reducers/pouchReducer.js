import {
  GET_CHARACTERS,
} from '../constants.js';

export default function characters(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        charactersLoaded: true,
      }
    default:
      return state;
  }
}