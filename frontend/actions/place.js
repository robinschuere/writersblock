import actionBuilder from './actionBuilder';
import placeDb from '../helpers/pouch/place';

const actions = actionBuilder(placeDb, 'Place');

export const addPlace = async (
  place, dispatch) => actions.add(place, dispatch);

export const updatePlace = async (
  place, dispatch) => actions.update(place, dispatch);

export const importPlace = async (
  place, dispatch) => actions.importData(place, dispatch);

export const removePlace = async (
  place, dispatch) => actions.remove(place, dispatch);

export const getPlaces = async (
  storyId, dispatch) => actions.getAllByStoryId(storyId, dispatch);

export const getPlacesByStories = async (
  stories, dispatch) => actions.getAllByStories(stories, dispatch);

export const removePlacesFromStory = async (
  storyId, dispatch) => actions.removeFromStory(storyId, dispatch);
