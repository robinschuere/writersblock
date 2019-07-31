import modelBuilder from './modelBuilder';
import constants from '../../constants';

const storySettings = modelBuilder(constants.storySettingsDb);

const getAllByStoryId = storyId => storySettings.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...storySettings,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
