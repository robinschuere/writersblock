import {
  ADD_CHARACTER,
  DELETE_CHARACTER,
  SAVE_CHARACTER,
  UPDATE_CHARACTER,
  GET_CHARACTERS,
} from '../constants.js';

export function addCharacter(character){
  return {
    type: ADD_CHARACTER,
    character: character,
  }
}

export function deleteCharacter(id){
  return {
    type: DELETE_CHARACTER,
    id: id,
  }
}

export function saveCharacter(character){
  return {
    type: SAVE_CHARACTER,
    character: character,
  }
}

export function pushCharacters(characters){
  return {
    type: GET_CHARACTERS,
    characters: characters,
  }
}