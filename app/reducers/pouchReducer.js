import {
  GET_CHARACTERS,
} from '../constants';

export default function characters(state = {}, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return Object.assign({}, state, { charactersLoaded: true });
    default:
      return state;
  }
}
