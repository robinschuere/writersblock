import {
  ADD_CHARACTER,
  DELETE_CHARACTER,
  UPDATE_CHARACTER,
  SAVE_CHARACTER,
  GET_CHARACTERS,
} from '../constants.js';
import moment from 'moment';

export default function characters(state = [], action) {
  switch (action.type) {
    case ADD_CHARACTER:

      return [
        ...state,
        action.character
      ];

    case DELETE_CHARACTER:
      const deleteIndex = getIndex(state, action.id);
      return [
        ...state.slice(0, deleteIndex),
        ...state.slice(deleteIndex + 1)
      ]
    case SAVE_CHARACTER:
      const updateIndex = getIndex(state, action.character._id);
      return [
        ...state.slice(0, updateIndex),
        action.character,
        ...state.slice(updateIndex + 1)
      ]
    case GET_CHARACTERS:
      return action.characters;
    default:
      return state;
  }
}

export function getIndex(state, id) {
  for (var i = 0; i < state.length; i++) {
    if (state[i]._id === id) {
      return i;
    }
  }
  return -1;
}

export function getCharacterById(state, id){
  const index = getIndex(state, id);
  return state[index];
}