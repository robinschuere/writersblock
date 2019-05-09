import userModel from './user';
import storyModel from './story';
import chapterModel from './chapter';
import constants from '../../../constants';

export default (table) => {
  switch (table) {
    case constants.userDb:
      return row => userModel(row);
    case constants.storyDb:
      return row => storyModel(row);
    case constants.chapterDb:
      return row => chapterModel(row);
    default:
      throw new Error('Table was not recognized');
  }
};
