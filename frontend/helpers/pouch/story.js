import actionBuilder from './actionBuilder';
import constants from '../../constants';

const stories = actionBuilder(constants.storyDb);

const getAllByUserId = userId => stories.getAll()
  .then(rows => rows.filter(r => r.userId === userId));

export default {
  ...stories,
  getAll: getAllByUserId,
  getAllByUserId,
};
