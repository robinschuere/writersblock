import modelBuilder from './modelBuilder';
import constants from '../../constants';

const characters = modelBuilder(constants.characterDb);

const getAllByStoryId = storyId => characters.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...characters,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
