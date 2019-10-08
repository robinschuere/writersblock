import { constants } from '../constants';

export default (database, name) => {
  const add = async (value, dispatch) => {
    const newValue = await database.insert(value);
    dispatch({
      type: constants.actions[`add${name}`],
      value: newValue,
    });
  };
  const update = async (value, dispatch) => {
    const updatedValue = await database.update(value);
    dispatch({
      type: constants.actions[`update${name}`],
      value: updatedValue,
    });
  };
  const importData = async (value, dispatch) => {
    const imported = await database.importData(value);
    dispatch({
      type: constants.actions[`update${name}`],
      value: imported,
    });
  };
  const remove = async (value, dispatch) => {
    await database.remove(value);
    dispatch({
      type: constants.actions[`remove${name}`],
      value,
    });
  };
  const getAllByStoryId = async (storyId, dispatch) => {
    const values = await database.getAll(storyId);
    dispatch({
      type: constants.actions[`set${name}s`],
      value: values,
    });
  };
  const getAllByStories = async (stories, dispatch) => {
    await Promise.all(stories.map(s => getAllByStoryId(s.id, dispatch)));
  };
  const removeFromStory = async (storyId, dispatch) => {
    const values = await database.getAll(storyId);
    await Promise.all(values.map(c => database.remove(c)));
    dispatch({
      type: constants.actions[`remove${name}s`],
      values,
    });
  };

  return {
    add,
    update,
    importData,
    remove,
    getAllByStoryId,
    getAllByStories,
    removeFromStory,
  };
};
