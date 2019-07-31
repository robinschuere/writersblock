import modelBuilder from './modelBuilder';
import constants from '../../constants';

const items = modelBuilder(constants.itemDb);

const getAllByStoryId = storyId => items.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...items,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
