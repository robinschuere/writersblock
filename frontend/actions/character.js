import charactersDb from '../helpers/pouch/character';
import constants from '../constants';
import { removeRelationsFromCharacter } from './relation';
import { removeEventsFromCharacter } from './event';

export const addCharacter = async (character, dispatch) => {
  const newSetting = await charactersDb.insert(character);
  dispatch({
    type: constants.actions.addCharacter,
    value: newSetting,
  });
};

export const updateCharacter = async (character, dispatch) => {
  const updatedCharacter = await charactersDb.update(character);
  dispatch({
    type: constants.actions.updateCharacter,
    value: updatedCharacter,
  });
};

export const removeCharacter = async (character, dispatch) => {
  await charactersDb.remove(character);
  dispatch({ type: constants.actions.removeCharacter, value: character });
  await removeRelationsFromCharacter(character.id, dispatch);
  await removeEventsFromCharacter(character.id, dispatch);
};

export const getCharacters = async (storyId, dispatch) => {
  const characters = await charactersDb.getAll(storyId);
  dispatch({
    type: constants.actions.setCharacters,
    value: characters,
  });
};

export const getCharactersByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getCharacters(s.id, dispatch)));
};

export const removeCharactersFromStory = async (storyId, dispatch) => {
  const characters = await charactersDb.getAll(storyId);
  await Promise.all(characters.map(c => charactersDb.remove(c)));
  dispatch({
    type: constants.actions.removeCharacters,
    value: characters,
  });
};
