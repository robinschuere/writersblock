import modelBuilder from './modelBuilder';
import constants from '../../constants';

const chapters = modelBuilder(constants.chapterDb);

const getAllByStoryId = storyId => chapters.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...chapters,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
