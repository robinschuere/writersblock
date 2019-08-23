import placeDb from '../helpers/pouch/place';
import constants from '../constants';

export const addPlace = async (place, dispatch) => {
  const newSetting = await placeDb.insert(place);
  dispatch({
    type: constants.actions.addPlace,
    value: newSetting,
  });
};

export const updatePlace = async (place, dispatch) => {
  const updatedPlace = await placeDb.update(place);
  dispatch({
    type: constants.actions.updatePlace,
    value: updatedPlace,
  });
};

export const importPlace = async (place, dispatch) => {
  const imported = await placeDb.importData(place);
  dispatch({
    type: constants.actions.updatePlace,
    value: imported,
  });
};

export const removePlace = async (place, dispatch) => {
  await placeDb.remove(place);
  dispatch({ type: constants.actions.removePlace, value: place });
};

export const getPlaces = async (storyId, dispatch) => {
  const places = await placeDb.getAll(storyId);
  dispatch({
    type: constants.actions.setPlaces,
    value: places,
  });
};

export const getPlacesByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getPlaces(s.id, dispatch)));
};

export const removePlacesFromStory = async (storyId, dispatch) => {
  const places = await placeDb.getAll(storyId);
  await Promise.all(places.map(c => placeDb.remove(c)));
  dispatch({
    type: constants.actions.removePlaces,
    value: places,
  });
};
