import storySettingsDb from '../helpers/pouch/storySetting';
import constants from '../constants';


export const addStorySetting = async (storySetting, dispatch) => {
  const newSetting = await storySettingsDb.insert(storySetting);
  dispatch({
    type: constants.actions.addStorySetting,
    value: newSetting,
  });
};

export const updateStorySetting = async (storySetting, dispatch) => {
  const updatedStorySetting = await storySettingsDb.update(storySetting);
  dispatch({
    type: constants.actions.updateStorySetting,
    value: updatedStorySetting,
  });
};

export const removeStorySetting = async (storySetting, dispatch) => {
  await storySettingsDb.remove(storySetting);
  dispatch({ type: constants.actions.removeStorySetting, value: storySetting });
};

export const getStorySettings = async (storyId, dispatch) => {
  const storySettings = await storySettingsDb.getAll(storyId);
  dispatch({
    type: constants.actions.setStorySettings,
    value: storySettings,
  });
};

export const getStorySettingsByStories = async (stories, dispatch) => {
  await Promise.all(stories.map(s => getStorySettings(s.id, dispatch)));
};

export const removeStorySettingsFromStory = async (storyId, dispatch) => {
  const storySettings = await storySettingsDb.getAll(storyId);
  await Promise.all(storySettings.map(c => storySettingsDb.remove(c)));
  dispatch({
    type: constants.actions.removeStorySettings,
    value: storySettings,
  });
};
