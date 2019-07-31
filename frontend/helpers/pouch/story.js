import modelBuilder from './modelBuilder';
import constants from '../../constants';

const stories = modelBuilder(constants.storyDb);

const getAllByUserId = userId => stories.getAll()
  .then(rows => rows.filter(r => r.userId === userId));

export default {
  ...stories,
  getAll: getAllByUserId,
  getAllByUserId,
};
