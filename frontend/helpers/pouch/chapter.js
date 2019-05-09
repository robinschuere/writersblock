import actionBuilder from './actionBuilder';
import constants from '../../constants';

const chapters = actionBuilder(constants.chapterDb);

const getAllByStoryId = storyId => chapters.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...chapters,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
