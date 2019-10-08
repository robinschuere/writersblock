import actionBuilder from './actionBuilder';
import characterDb from '../helpers/pouch/character';
import { removeEventsFromCharacter } from './event';

const actions = actionBuilder(characterDb, 'Character');

export const addCharacter = async (
  character, dispatch) => actions.add(character, dispatch);

export const updateCharacter = async (
  character, dispatch) => actions.update(character, dispatch);

export const importCharacter = async (
  character, dispatch) => actions.importData(character, dispatch);

export const removeCharacter = async (character, dispatch) => {
  await actions.remove(character, dispatch);
  await removeEventsFromCharacter(character.id, dispatch);
};

export const getCharacters = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getCharactersByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removeCharactersFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
