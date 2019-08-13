import characterDb from '../helpers/pouch/character';
import constants from '../constants';
import { removeRelationsFromCharacter } from './relation';
import { removeEventsFromCharacter } from './event';

export const addCharacter = async (character, dispatch) => {
  const newSetting = await characterDb.insert(character);
  dispatch({
    type: constants.actions.addCharacter,
    value: newSetting,
  });
};

export const updateCharacter = async (character, dispatch) => {
  const updatedCharacter = await characterDb.update(character);
  dispatch({
    type: constants.actions.updateCharacter,
    value: updatedCharacter,
  });
};

export const importCharacter = async (character, dispatch) => {
  const imported = await characterDb.importData(character);
  dispatch({
    type: constants.actions.updateCharacter,
    value: imported,
  });
};

export const removeCharacter = async (character, dispatch) => {
  await characterDb.remove(character);
  dispatch({ type: constants.actions.removeCharacter, value: character });
  await removeRelationsFromCharacter(character.id, dispatch);
  await removeEventsFromCharacter(character.id, dispatch);
};

export const getCharacters = async (storyId, dispatch) => {
  const characters = await characterDb.getAll(storyId);
  dispatch({
    type: constants.actions.setCharacters,
    value: characters,
  });
};

export const getCharactersByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getCharacters(s.id, dispatch)));
};

export const removeCharactersFromStory = async (storyId, dispatch) => {
  const characters = await characterDb.getAll(storyId);
  await Promise.all(characters.map(c => characterDb.remove(c)));
  dispatch({
    type: constants.actions.removeCharacters,
    value: characters,
  });
};
