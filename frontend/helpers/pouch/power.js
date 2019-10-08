import modelBuilder from './modelBuilder';
import { constants } from '../../constants';

const db = modelBuilder(constants.powerDb);

const getAllByStoryId = storyId => db.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...db,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
