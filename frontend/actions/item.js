import itemsDb from '../helpers/pouch/item';
import constants from '../constants';

export const addItem = async (item, dispatch) => {
  const newSetting = await itemsDb.insert(item);
  dispatch({
    type: constants.actions.addItem,
    value: newSetting,
  });
};

export const updateItem = async (item, dispatch) => {
  const updatedItem = await itemsDb.update(item);
  dispatch({
    type: constants.actions.updateItem,
    value: updatedItem,
  });
};

export const removeItem = async (item, dispatch) => {
  await itemsDb.remove(item);
  dispatch({ type: constants.actions.removeItem, value: item });
};

export const getItems = async (storyId, dispatch) => {
  const items = await itemsDb.getAll(storyId);
  dispatch({
    type: constants.actions.setItems,
    value: items,
  });
};

export const getItemsByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getItems(s.id, dispatch)));
};

export const removeItemsFromStory = async (storyId, dispatch) => {
  const items = await itemsDb.getAll(storyId);
  await Promise.all(items.map(c => itemsDb.remove(c)));
  dispatch({
    type: constants.actions.removeItems,
    value: items,
  });
};
