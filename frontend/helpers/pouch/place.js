import modelBuilder from './modelBuilder';
import constants from '../../constants';

const places = modelBuilder(constants.placeDb);

const getAllByStoryId = storyId => places.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...places,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
